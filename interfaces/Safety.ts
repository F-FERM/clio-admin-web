export interface ListSafetyResponse {
  _id: string;
  heading: string;
  description: string;
  heroImage: string;
  overlayTitle: string;
  overlayDescription: string;
  complianceItems: ComplianceItem[];
  principlesTitle: string;
  principlesDescription: string;
  cta: string;
  principles: Principle[];
  pillarHeading: string;
  pillarDescription: string;
  pillarCards: PillarCard[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PillarCard {
  title: string;
  description: string;
  bg: string;
  textColor: string;
  descColor: string;
  backgroundImage: string;
  _id: string;
}

interface Principle {
  title: string;
  description?: string;
  isHighlighted: boolean;
  _id: string;
}

interface ComplianceItem {
  text: string;
  _id: string;
}