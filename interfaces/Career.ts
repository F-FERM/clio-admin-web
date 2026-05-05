export interface ListCareerResponse {
  _id: string;
  heading: string;
  description: string;
  cta: string;
  heroImage: string;
  whyItems: WhyItem[];
  whoTitle: string;
  whoDescription: string;
  whoImage: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  jobs: Job[];
}

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  isActive: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

interface WhyItem {
  title: string;
  description: string;
  _id: string;
}