import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import TextWithLinks from "../TextWithLinks.vue";

describe("TextWithLinks", () => {
  it("renders plain string parts as text", () => {
    const wrapper = mount(TextWithLinks, {
      props: {
        parts: ["Read the docs."],
      },
    });

    expect(wrapper.text()).toBe("Read the docs.");
  });

  it("renders link parts with the expected anchor attributes", () => {
    const wrapper = mount(TextWithLinks, {
      props: {
        parts: ["Read the ", { text: "docs", url: "https://vuejs.org/" }, "."],
      },
    });
    const link = wrapper.get("a");

    expect(link.text()).toBe("docs");
    expect(link.attributes("href")).toBe("https://vuejs.org/");
    expect(link.attributes("target")).toBe("_blank");
    expect(link.attributes("rel")).toBe("noopener");
  });
});
