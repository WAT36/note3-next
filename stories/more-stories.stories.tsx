import type { Meta, StoryObj } from "@storybook/react";

import MoreStories from "../components/more-stories";
import SampleIcon from "./assets/sampleIcon.png";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "MoreStories",
  component: MoreStories,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    //layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof MoreStories>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    posts: [
      {
        slug: "/",
        title: "Title test",
        date: "2023-12-14T22:01:13.000Z",
        coverImage: SampleIcon.src,
        author: {
          name: "著者名",
          picture: SampleIcon.src,
        },
        excerpt: "excerpt test",
        ogImage: {
          url: "/",
        },
        content: "content test",
      },
    ],
  },
};
