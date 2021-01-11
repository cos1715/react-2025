export enum ECollections {
  users = 'users',
  sites = 'sites',
  feedback = 'feedback',
}

export interface IUser {
  uid: string;
  email: string;
  name: string;
  token: string;
  provider: string;
  photoURL: string;
}

export interface ISite {
  id: string;
  name: string;
  link: string;
  createdAt: string;
  authorId?: string;
}

export interface IFeedback {
  id?: string;
  author: string;
  authorId: string;
  provider: string;
  rating: number;
  siteId: string;
  status: string;
  text: string;
  createdAt: string;
}
