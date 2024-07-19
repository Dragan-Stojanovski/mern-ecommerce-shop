import instance from "../../../infra/http";

export async function deleteFromCart(id: string, quantity: number) {
    return await instance.delete(`/cart/${id}`, { data: { quantity } });
}