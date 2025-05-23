import type { Meta, StoryObj } from "@storybook/react";

import HeroPost from "./HeroPost";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Molecules/HeroPost",
  component: HeroPost,
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
} satisfies Meta<typeof HeroPost>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Main: Story = {
  args: {
    title: "タイトルテスト",
    coverImage: "/assets/blog/authors/WAT.jpg",
    date: "2000-01-01",
    excerpt: "excerpt",
    author: {
      name: "name",
      picture: "/assets/blog/authors/WAT.jpg",
    },
    slug: "",
  },
};
