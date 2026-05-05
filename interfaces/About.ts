export interface ListAboutHeroSection {
  _id: string;
  heading: string;
  description: string;
  heroImage: string;
  whoWeAre: WhoWeAre;
  whoImage: string;
  mission: WhoWeAre;
  vision: WhoWeAre;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface WhoWeAre {
  title: string;
  description: string;
  _id: string;
}


export interface WhatWeDoWhyChooseClio {
  _id: string;
  title: string;
  cards: Card[];
  whyTitle: string;
  whyDescription: string;
  cta: string;
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
  description: string;
  image: string;
  _id: string;
}


export interface ListWhoWeAreSection {
  _id: string;
  heading: string;
  description: string;
  heroImage: string;
  whoWeAre: WhoWeAre;
  whoImage: string;
  mission: WhoWeAre;
  vision: WhoWeAre;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface WhoWeAre {
  title: string;
  description: string;
  _id: string;
}