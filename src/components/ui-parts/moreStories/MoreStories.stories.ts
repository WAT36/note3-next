import type { Meta, StoryObj } from "@storybook/react";

import MoreStories from "./MoreStories";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Molecules/MoreStories",
  component: MoreStories,
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
} satisfies Meta<typeof MoreStories>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Main: Story = {
  args: {
    posts: [
      {
        slug: "",
        title: "タイトルテスト",
        date: "2000-01-01",
        coverImage: "/assets/blog/authors/WAT.jpg",
        author: {
          name: "name",
          picture: "/assets/blog/authors/WAT.jpg",
        },
        excerpt: "excerpt",
        ogImage: {
          url: "/assets/blog/authors/WAT.jpg",
        },
        content: "content test",
        tag: [],
      },
      {
        slug: "",
        title: "タイトルテスト2",
        date: "2000-01-02",
        coverImage: "/assets/blog/authors/WAT.jpg",
        author: {
          name: "name",
          picture: "/assets/blog/authors/WAT.jpg",
        },
        excerpt: "excerpt",
        ogImage: {
          url: "/assets/blog/authors/WAT.jpg",
        },
        content: "content test2",
        tag: [],
      },
    ],
    pageNum: 2,
  },
};
