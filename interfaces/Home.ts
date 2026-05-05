export interface ListVesselLanding {
  _id: string;
  heading: string;
  leftInfo: string;
  summary: string;
  rightTitle: string;
  rightDescription: string;
  rightBullets: string[];
  backgroundImage: string;
  pillImage: string;
  cardImage: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ListOurService {
  _id: string;
  title: string;
  description: string;
  cards: CardService[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CardService {
  title: string;
  tag: string;
  image: string;
  hoverText: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListShipManagementLogistics {
  _id: string;
  heading: string;
  description: string;
  sideCardTitle: string;
  sideCardDescription: string;
  sideImage: string;
  cards: Card[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Card {
  title: string;
  description: string;
  tags: string[];
  _id: string;
}



export interface ListTransportMaritime {
  _id: string;
  heading: string;
  description: string;
  cta: string;
  cardTitle: string;
  cardDescription: string;
  leftImage: string;
  rightImage: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}



export interface ListWorkFlowEfficiency {
  _id: string;
  heading: string;
  description: string;
  cta: string;
  steps: Step[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Step {
  id: string;
  title: string;
  description: string;
  variant: string;
  _id: string;
}


export interface ListFaqSection {
  _id: string;
  title: string;
  description: string;
  cta: string;
  items: Item[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Item {
  question: string;
  answer: string;
  _id: string;
}



export interface FileUploadResult {
   url: string;
}




export interface UpdateWorkFlow {
  heading: string;
  description: string;
  cta: string;
  steps: UpdateStep[];
}

export interface UpdateStep {
  id: string;
  title: string;
  description: string;
  variant: string;
}

