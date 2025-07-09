import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "UI Elements/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tagName: {
      control: "text",
      description: "タグの名前",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tagName: "React",
  },
};

export const LongTag: Story = {
  args: {
    tagName: "TypeScript",
  },
};

export const ShortTag: Story = {
  args: {
    tagName: "JS",
  },
};

export const JapaneseTag: Story = {
  args: {
    tagName: "フロントエンド",
  },
};

export const SpecialCharacters: Story = {
  args: {
    tagName: "C++",
  },
};
