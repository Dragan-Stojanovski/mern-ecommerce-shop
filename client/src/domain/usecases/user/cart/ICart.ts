export interface IAddToCartRequest {
    productId:string;
    quantity:number;
}

export interface IProduct {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    marketingLabel: string;
    productImages: string;
    __v: number;
}

export interface ICartProduct {
    productId: IProduct;
    quantity: number;
    _id: string;
}

export interface ICartResponse {
    _id: string;
    userId: string;
    products: ICartProduct[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}