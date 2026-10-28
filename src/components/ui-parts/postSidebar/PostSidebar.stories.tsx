import type { Meta, StoryObj } from "@storybook/react";

import PostSidebar from "./PostSidebar";

const meta = {
  title: "Molecules/PostSidebar",
  component: PostSidebar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PostSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const tags = [
  { name: "AI", slug: "AI", count: 13 },
  { name: "AWS", slug: "AWS", count: 10 },
  { name: "フロントエンド", slug: "フロントエンド", count: 8 },
  { name: "CI/CD", slug: "CI-CD", count: 1 },
];

const years = [
  {
    year: "2026",
    count: 5,
    months: [
      { month: "09", count: 2 },
      { month: "07", count: 1 },
      { month: "06", count: 2 },
    ],
  },
  {
    year: "2025",
    count: 3,
    months: [
      { month: "12", count: 1 },
      { month: "11", count: 2 },
    ],
  },
];

export const Main: Story = {
  args: { tags, years },
};

export const CurrentTag: Story = {
  args: { tags, years, currentTag: "AWS" },
};

export const CurrentYear: Story = {
  args: { tags, years, currentYear: "2025" },
};
