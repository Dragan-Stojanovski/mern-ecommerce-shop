import { ICartProduct } from "../../../../../domain/usecases/user/cart/ICart";

export const calculateTotalPrice = (products: ICartProduct[]): number => {
    return products.reduce((total, product) => {
        return total + product.quantity * product.productId.price;
    }, 0);
};