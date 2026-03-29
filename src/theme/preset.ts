import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

const AppPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "#f2fbf9",
      100: "#d5f3ec",
      200: "#abe5d8",
      300: "#79d1bf",
      400: "#43b49f",
      500: "#2f8f80",
      600: "#277468",
      700: "#225d55",
      800: "#1e4a45",
      900: "#1b3f3a",
      950: "#0c2523",
    },
    focusRing: {
      width: "2px",
      style: "solid",
      color: "{primary.400}",
      offset: "1px",
      shadow: "none",
    },
    content: {
      borderRadius: "1rem",
    },
    navigation: {
      item: {
        borderRadius: "0.875rem",
      },
    },
  },
  components: {
    button: {
      root: {
        borderRadius: "999px",
        sm: {
          paddingX: "0.75rem",
          paddingY: "0.5rem",
          iconOnlyWidth: "2.25rem",
        },
        label: {
          fontWeight: "600",
        },
        focusRing: {
          width: "{focus.ring.width}",
          style: "{focus.ring.style}",
          offset: "{focus.ring.offset}",
        },
      },
    },
    card: {
      root: {
        borderRadius: "1.25rem",
        shadow: "0 20px 45px -28px rgba(15, 23, 42, 0.45)",
      },
      body: {
        padding: "1.25rem 1.25rem 1.5rem",
        gap: "0.75rem",
      },
      title: {
        fontSize: "1.125rem",
        fontWeight: "600",
      },
    },
    menubar: {
      root: {
        borderRadius: "1.25rem",
        padding: "0.75rem 1rem",
      },
      baseItem: {
        borderRadius: "0.875rem",
      },
      item: {
        borderRadius: "0.875rem",
      },
      submenu: {
        borderRadius: "1rem",
      },
    },
    timeline: {
      event: {
        minHeight: "5.5rem",
      },
      vertical: {
        eventContent: {
          padding: "0 1.25rem",
        },
      },
      eventMarker: {
        size: "1rem",
        borderWidth: "0",
        content: {
          size: "0.5rem",
          insetShadow: "none",
        },
      },
    },
  },
});

export default AppPreset;
