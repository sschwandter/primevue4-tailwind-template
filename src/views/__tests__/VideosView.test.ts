import { mount } from "@vue/test-utils";
import { ref } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Video } from "@/composables/trendingVideosQuery";

async function mountVideosView({
  hasYouTubeApiKey = true,
  videos = undefined,
  isLoading = false,
  error = null,
}: {
  hasYouTubeApiKey?: boolean;
  videos?: Video[];
  isLoading?: boolean;
  error?: Error | null;
} = {}) {
  const warnIfMissingMock = vi.fn();

  vi.doMock("@/composables/trendingVideosQuery", () => ({
    hasYouTubeApiKey,
    useTrendingVideosQuery: () => ({
      data: ref(videos),
      isLoading: ref(isLoading),
      error: ref(error),
    }),
    warnIfYouTubeApiKeyMissing: warnIfMissingMock,
  }));

  const { default: VideosView } = await import("../VideosView.vue");

  const wrapper = mount(VideosView, {
    global: {
      stubs: {
        ProgressSpinner: {
          template: '<div data-test="spinner" />',
        },
        Message: {
          template: '<div data-test="message"><slot /></div>',
        },
        Card: {
          template:
            '<article data-test="card"><slot name="header" /><h2><slot name="title" /></h2><p><slot name="subtitle" /></p></article>',
        },
      },
    },
  });

  return { wrapper, warnIfMissingMock };
}

describe("VideosView", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("shows a setup message when the API key is missing", async () => {
    const { wrapper, warnIfMissingMock } = await mountVideosView({
      hasYouTubeApiKey: false,
    });

    expect(wrapper.get('[data-test="message"]').text()).toContain(
      "Set VITE_YOUTUBE_API_KEY in .env.local to use this page.",
    );
    expect(warnIfMissingMock).toHaveBeenCalledOnce();
  });

  it("shows the query error message when fetching fails", async () => {
    const { wrapper } = await mountVideosView({
      error: new Error("quota exceeded"),
    });

    expect(wrapper.get('[data-test="message"]').text()).toContain("quota exceeded");
  });

  it("shows a loading spinner while the query is pending", async () => {
    const { wrapper } = await mountVideosView({
      isLoading: true,
    });

    expect(wrapper.find('[data-test="spinner"]').exists()).toBe(true);
  });

  it("renders cards and outbound links for successful results", async () => {
    const { wrapper } = await mountVideosView({
      videos: [
        {
          id: "abc123",
          title: "Test title",
          thumbnail: "https://img.example/video.jpg",
          channelTitle: "Channel name",
          publishedAt: "3/28/2026",
        },
      ],
    });
    const link = wrapper.get('a[href="https://www.youtube.com/watch?v=abc123"]');

    expect(link.attributes("target")).toBe("_blank");
    expect(wrapper.get('[data-test="card"]').text()).toContain("Test title");
    expect(wrapper.text()).toContain("Channel name");
  });
});
