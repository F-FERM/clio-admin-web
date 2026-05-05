export interface ListFleetResponse {
  _id: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  cta: string;
  stats: Stat[];
  title: string;
  description: string;
  cards: Card[];
  bottomTitle: string;
  bottomDescription: string;
  benefits: Benefit[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Benefit {
  title: string;
  description: string;
  _id: string;
}

interface Card {
  title: string;
  tag: string;
  image: string;
  hoverText: string;
  _id: string;
}

interface Stat {
  label: string;
  value: string;
  _id: string;
}