import type Author from "./author";

type NoteType = {
  slug: string;
  title: string;
  date: string;
  link?: {
    css?: string[];
    javascript?: string[];
  };
  programming?: string[];
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  isDir?: boolean;
};

export default NoteType;
