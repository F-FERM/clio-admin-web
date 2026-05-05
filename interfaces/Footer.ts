export interface ListFooterResponse {
  _id: string;
  brand: string;
  copyright: string;
  sections: Section[];
  officeAddress: string;
  email: string;
  phone: string;
  privacyPolicy: string;
  terms: string;
  ctaText: string;
  ctaLink: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Section {
  title: string;
  links: Link[];
  _id: string;
}

interface Link {
  label: string;
  url: string;
  _id: string;
}