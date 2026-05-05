export interface ListContactResponse {
  _id: string;
  heading: string;
  description: string;
  backgroundImage: string;
  contactInfo: ContactInfo[];
  formTitle: string;
  buttonText: string;
  bottomTitle: string;
  bottomDescription: string;
  bottomImage: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ContactInfo {
  title: string;
  value: string;
  _id: string;
}
