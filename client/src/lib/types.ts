export interface ProductType {
  id: string;
  name: string;
  description: string;
  description2: string;
  description3: string;
  points: string[];
  maxPrice: number;
  sellPrice: number;
  fragrence: string;
  strength: string;
  preference: string;
  sustainable: string;
  type: string;
  idealFor: string;
  quantity: number;
  productOnCategories: {
    category: Category;
  }[];
  images: {
    url: string;
  }[];
}

export interface StateCityDataType {
  "Andaman and Nicobar Islands": string[];
  Haryana: string[];
  "Tamil Nadu": string[];
  "Madhya Pradesh": string[];
  Jharkhand: string[];
  Mizoram: string[];
  Nagaland: string[];
  "Himachal Pradesh": string[];
  Tripura: string[];
  "Andhra Pradesh": string[];
  Punjab: string[];
  Chandigarh: string[];
  Rajasthan: string[];
  Assam: string[];
  Odisha: string[];
  Chhattisgarh: string[];
  "Jammu and Kashmir": string[];
  Karnataka: string[];
  Manipur: string[];
  Kerala: string[];
  Delhi: string[];
  "Dadra and Nagar Haveli": string[];
  Puducherry: string[];
  Uttarakhand: string[];
  "Uttar Pradesh": string[];
  Bihar: string[];
  Gujarat: string[];
  Telangana: string[];
  Meghalaya: string[];
  "Himachal Praddesh": string[];
  "Arunachal Pradesh": string[];
  Maharashtra: string[];
  Goa: string[];
  "West Bengal": string[];
}

export interface AddressType {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  alternatePhoneNumber?: string;
  address1: string;
  address2?: string;
  landmark?: string;
  city: string;
  state: string;
  country: string;
  postCode: string;
}

interface Category {
  id: string;
  name: string;
  isTag: boolean;
}
export interface GetProduct {
  id: string;
  name: string;
  description: string;
  sellPrice: number;
  maxPrice: number;
  categories: Pick<Category, "id" | "name">[];
  tags: Pick<Category, "id" | "name">[];
  images: string[];
}

enum Position {
  LEFT,
  RIGHT,
}

interface Carousel {
  id: string;
  createdAt: Date;
  link: string;
  preference: number;
  isBlack: boolean;
  position: Position;
}
export interface HomeGetResponse {
  msg: string;
  data: {
    products: GetProduct[];
    carousel: Carousel[];
  };
}

export interface ProductGetResponse {
  msg: string;
  data: {
    product: ProductType;
    suggestedProduct: GetProduct[];
  };
}

export interface DBUser {
  mobileNo: string;
  uid: string;
  id: string;
  name: string;
  email: string | null;
  isEmailVerified: boolean;
  blocked: boolean;
  createdAt: Date;
}

export interface GetAuthResponse {
  msg: string;
  data: DBUser;
}

export interface GetCartResponse {
  msg: string;
  data: {
    productId: string;
    quantity: number;
    isSaveForLater: boolean;
    product: {
      name: string;
      description: string;
      maxPrice: number;
      sellPrice: number;
      images: {
        url: string;
      }[];
    };
  }[];
}

export interface GetCategoryProductsRespone {
  msg: string;
  data: Omit<ProductType, "productOnCategories">[];
  category: {
    id: string;
    name: string;
  };
}

export interface CartCardProps {
  productId: string;
  quantity: number;
  isSaveForLater: boolean;
  product: {
    name: string;
    description: string;
    maxPrice: number;
    sellPrice: number;
    images: {
      url: string;
    }[];
  };
}
