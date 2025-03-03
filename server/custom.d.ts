interface Admin {
  id: string;
  name: string;
  email: string;
  permission: string[];
  mobileNo: string;
  isOwner: Boolean;
}

declare namespace Express {
  export interface Request {
    admin: Admin;
  }
}
