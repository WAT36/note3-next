import type { Meta, StoryObj } from "@storybook/react";

import PostTitle from "./PostTitle";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Atom/PostTitle",
  component: PostTitle,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
    backgrounds: {
      default: "black",
      values: [
        { name: "black", value: "#000000" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof PostTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Main: Story = {
  args: {
    children: <p>{"記事タイトルテスト"}</p>,
  },
};
