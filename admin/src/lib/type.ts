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

export interface VerifyOTPsRequest {
  mobileOtp: string;
  emailOtp: string;
}

export interface ProductRequest {
  name: string;
  description: string;
  description2: string;
  description3: string;
  points: string[];
  maxPrice: string;
  sellPrice: string;
  fragrence: string;
  strength: string;
  preference: string;
  sustainable: string;
  type: string;
  idealFor: string;
  quantity: string;
  category: string[];
  images: string[];
}

export interface Media {
  id: string;
  createdAt: Date;
  url: string;
  productId: string;
}

export interface Category {
  name: string;
  description: string;
  id: string;
  isTag: boolean;
}

export interface UpdatedCategoryRequest {
  name: string;
  description: string;
  isTag: boolean;
}

export interface AddCategoryRequest {
  name: string;
  description: string;
  isTag: boolean;
}

export interface User {
  name: string;
  mobileNo: string;
  email: string | null;
  isEmailVerified: boolean;
}

export interface AddCarouselRequest {
  sessionId: string;
  link: string;
  preference: string;
  isBlack: boolean;
  imageId: string;
  position: string;
}

export interface AddCarousel {
  link: string;
  preference: string;
  isBlack: boolean;
  imageId: string;
  position: string;
}

export interface Carousel {
  isBlack: boolean;
  position: string;
  preference: number;
  link: string;
  id: string;
  createdAt: Date;
  images: {
    url: string;
  }[];
}

export interface GetCarouselRespone {
  msg: string;
  data: Carousel[];
}
