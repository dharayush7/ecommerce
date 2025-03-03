export interface Manager {
  email: string;
  permission: string[];
  name: string;
  isOwner: boolean;
}

export interface AddManegerRequest {
  name: string;
  email: string;
  mobileNo: string;
  password: string;
  admin: boolean;
  product: boolean;
  order: boolean;
  payment: boolean;
  customer: boolean;
  site: boolean;
}

export interface UpdatedManegerRequest {
  name: string;
  email: string;
}

export interface UpdatedPermissionRequest {
  admin: boolean;
  product: boolean;
  order: boolean;
  payment: boolean;
  customer: boolean;
  site: boolean;
}
