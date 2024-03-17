import type { Meta, StoryObj } from "@storybook/react";

import PostPreview from "./PostPreview";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Molecules/PostPreview",
  component: PostPreview,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof PostPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Main: Story = {
  args: {
    title: "Post Title",
    coverImage: "/",
    date: "2000/01/01",
    excerpt: "excerpt.",
    author: {
      name: "Author name",
      picture: "/",
    },
    slug: "/",
  },
};
