export interface ICreateProductRequest{
    name:string;
    price:number;
    description:string;
    category:string;
    marketingLabel:string;
    productImage:string;
}

export interface ICreateProductResponse{
    name:string;
    price:number;
    description:string;
    category:string;
    marketingLabel:string;
    productImage:string;
}


export interface IGetProductRequest{
    name:string | null;
    price:number | null;
    description:string | null;
    category:string | null;
    marketingLabel:string | null;
    productImages:string | null;
}