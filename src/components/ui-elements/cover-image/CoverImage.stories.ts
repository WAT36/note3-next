import type { Meta, StoryObj } from "@storybook/react";

import CoverImage from "./CoverImage";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Atom/CoverImage",
  component: CoverImage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
    backgrounds: {
      default: "white",
      values: [
        { name: "black", value: "#000000" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof CoverImage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Main: Story = {
  args: {
    title: "Cover Image Title",
    src: "/assets/blog/altImage.png",
  },
};
