interface Admin {
  id: string;
  name: string;
  email: string;
  permission: string[];
  mobileNo: string;
  isOwner: Boolean;
}

interface User {
  id: string;
  mobileNo: string;
  name: string;
  email: string | null;
}

declare namespace Express {
  export interface Request {
    admin: Admin;
    user: User;
  }
}
