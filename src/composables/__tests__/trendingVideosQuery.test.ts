import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { useQueryMock, ofetchMock, errorMock, warnMock } = vi.hoisted(() => ({
  useQueryMock: vi.fn((options: object) => options),
  ofetchMock: vi.fn(),
  errorMock: vi.fn(),
  warnMock: vi.fn(),
}));

vi.mock("@tanstack/vue-query", () => ({
  useQuery: useQueryMock,
}));

vi.mock("ofetch", () => ({
  ofetch: ofetchMock,
}));

vi.mock("@/utils/logger", () => ({
  logger: {
    withTag: vi.fn(() => ({
      error: errorMock,
      warn: warnMock,
    })),
  },
}));

describe("trendingVideosQuery", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("treats placeholder API keys as missing", async () => {
    vi.stubEnv("VITE_YOUTUBE_API_KEY", "your-api-key-here");

    const { hasYouTubeApiKey, isYouTubeApiKeyConfigured } = await import("../trendingVideosQuery");

    expect(isYouTubeApiKeyConfigured("your-api-key-here")).toBe(false);
    expect(hasYouTubeApiKey).toBe(false);
  });

  it("disables the query when the API key is absent", async () => {
    vi.stubEnv("VITE_YOUTUBE_API_KEY", "");

    const { useTrendingVideosQuery } = await import("../trendingVideosQuery");
    const query = useTrendingVideosQuery() as unknown as { enabled: boolean };

    expect(useQueryMock).toHaveBeenCalledOnce();
    expect(query.enabled).toBe(false);
  });

  it("maps the YouTube response into the app video shape", async () => {
    vi.stubEnv("VITE_YOUTUBE_API_KEY", "real-key");
    ofetchMock.mockResolvedValue({
      items: [
        {
          id: "abc123",
          snippet: {
            title: "Test title",
            thumbnails: {
              medium: { url: "https://img.example/video.jpg" },
            },
            channelTitle: "Channel name",
            publishedAt: "2026-03-28T10:00:00.000Z",
          },
        },
      ],
    });

    const { useTrendingVideosQuery } = await import("../trendingVideosQuery");
    const query = useTrendingVideosQuery() as unknown as { queryFn: () => Promise<unknown> };
    const videos = (await query.queryFn()) as Array<Record<string, string>>;

    expect(ofetchMock).toHaveBeenCalledWith("https://www.googleapis.com/youtube/v3/videos", {
      query: {
        part: "snippet",
        chart: "mostPopular",
        maxResults: 12,
        key: "real-key",
      },
    });
    expect(videos).toEqual([
      {
        id: "abc123",
        title: "Test title",
        thumbnail: "https://img.example/video.jpg",
        channelTitle: "Channel name",
        publishedAt: new Date("2026-03-28T10:00:00.000Z").toLocaleDateString(),
      },
    ]);
  });

  it("logs and rethrows fetch failures", async () => {
    vi.stubEnv("VITE_YOUTUBE_API_KEY", "real-key");
    const failure = new Error("quota exceeded");
    ofetchMock.mockRejectedValue(failure);

    const { useTrendingVideosQuery } = await import("../trendingVideosQuery");
    const query = useTrendingVideosQuery() as unknown as { queryFn: () => Promise<unknown> };

    await expect(query.queryFn()).rejects.toThrow("quota exceeded");
    expect(errorMock).toHaveBeenCalledWith("Failed to fetch YouTube videos", failure);
  });
});
