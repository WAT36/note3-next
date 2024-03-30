import type { Meta, StoryObj } from "@storybook/react";

import NotePage from "./NotePage";
import { RecoilRoot } from "recoil";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Pages/NotePage",
  component: NotePage,
  decorators: [(story) => <RecoilRoot>{story()} </RecoilRoot>],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof NotePage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Main: Story = {
  args: {
    note: {
      slug: "/",
      title: "note-title",
      date: "2000-01-01",
      coverImage: "",
      author: {
        name: "author name",
        picture: "/blog/authors/WAT.jpg",
      },
      excerpt: "excerpt",
      ogImage: {
        url: "",
      },
      content: "content",
    },
  },
};
