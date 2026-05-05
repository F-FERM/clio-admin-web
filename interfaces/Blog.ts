export interface LisBlogResponse {
  _id: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heading: string;
  leftTitle: string;
  leftText: string;
  rightTitle: string;
  rightText: string;
  bottomImage: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  cards: Card[];
}

interface Card {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  tag: string;
  tags: string[];
  date: string;
  isPublished: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}