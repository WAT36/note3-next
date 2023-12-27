import type { Meta, StoryObj } from "@storybook/react";

import PostPreview from "../components/post-preview";
import SampleIcon from "./assets/sampleIcon.png";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "PostPreview",
  component: PostPreview,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    //layout: "centered",
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof PostPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    title: "post-header-title",
    coverImage: "./assets/sampleIcon.png",
    date: "2023-12-14T22:01:13.000Z",
    excerpt: "excerpt test.",
    author: {
      name: "著者名",
      picture: SampleIcon.src,
    },
    slug: "/",
  },
};
