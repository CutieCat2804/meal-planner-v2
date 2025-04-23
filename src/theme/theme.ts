import { createSystem, defaultConfig } from "@chakra-ui/react";

const system = createSystem(defaultConfig, {
  globalCss: { html: { colorPalette: "green" } },
  theme: {
    recipes: {
      text: {
        variants: {
          variant: {
            primary: {
              fontWeight: "bold",
              color: "colorPalette.700",
            },
          },
        },
      },
    },
  },
});

export default system;
