export interface IOrderTracking {
  id: string;
  idDeCompra: string;
  receptor: User;
  owner: User;
  message: string;
  collected: boolean;
  createdAt: string;
  updatedAt: string;
}

type User = {
  _id: string;
  name: string;
  login: string;
  phone: string;
  email: string;
};
