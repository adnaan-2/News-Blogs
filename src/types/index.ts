export type Article = {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedDate: string;
  category: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string; // Optional for security reasons
};

export type BlogPost = {
  slug: string;
  title: string;
  content: string;
  author: User;
  publishedDate: string;
};