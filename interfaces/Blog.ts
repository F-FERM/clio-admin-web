export interface LisBlogResponse {
  _id: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heading: string;
  leftTitle: string;
  leftText: string;
  leftImage: string;
  rightTitle: string;
  rightText: string;
  rightImage: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  cards: Card[];
}

export interface Card {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  tag: string;
  tags: string[];
  date: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateBlogSectionPayload {
  section?: Card[];
  [key: string]: any;
}
