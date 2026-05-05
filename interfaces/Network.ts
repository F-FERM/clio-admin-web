export interface ListGlobalNetworkResponse {
  _id: string;
  heading: string;
  mainImage: string;
  overlay: Overlay;
  sideText: string;
  smartTitle: string;
  smartDescription: string;
  cta: string;
  smartImages: SmartImage[];
  features: Feature[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Feature {
  title: string;
  points: string[];
  variant: string;
  _id: string;
}

interface SmartImage {
  image: string;
  title?: string;
  _id: string;
}

interface Overlay {
  title: string;
  description: string;
  points: string[];
  image: string;
  _id: string;
}