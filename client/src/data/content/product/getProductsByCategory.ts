import instance from "../../../infra/http";

export async function getProductsByCategory(category: string) {
    return await instance.get(`/products/${category}`);
}