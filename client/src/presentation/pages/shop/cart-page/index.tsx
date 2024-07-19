import { useEffect, useState } from "react";
import style from "./CartPage.module.css";
import { getCartProducts } from "../../../../data/user/cart/getCartProducts";
import { ICartResponse, ICartProduct } from "../../../../domain/usecases/user/cart/ICart";
import GenericTable from "../../../components/base-ui/generic-table";
import SetMetaInfo from "../../../../infra/utility/SetMetaInfo";
import DeleteConfirmationDialog from "../../admin/components/delete-confirmation-dialog";
import { deleteFromCart } from "../../../../data/user/cart/deleteFromCart";
import { IoClose } from "react-icons/io5";
import { IColumn } from "../../../../domain/usecases/content/generic-table";
import ProceedToCheckout from "./components/proceed-to-checkout";
import { calculateTotalPrice } from "./functions/calculateTotalPrice";

const CartPage = (): JSX.Element => {
    const [cartData, setCartData] = useState<ICartResponse | null>(null);
    const [targetItem, setTargetItem] = useState<null | string>(null);
    const [deleteQuantity, setDeleteQuantity] = useState<number>(1);
    const [isDeleteTriggered, setIsDeleteTriggered] = useState();

    const columns: IColumn<ICartProduct>[] = [
        {
            header: "Image",
            accessor: (product: ICartProduct) => (
                <img
                    src={product.productId.productImages}
                    alt={product.productId.name}
                    width="100px"
                />
            ),
        },
        { header: "Name", accessor: (product: ICartProduct) => product.productId.name },
        { header: "Quantity", accessor: "quantity" },
        { header: "Price", accessor: (product: ICartProduct) => `$${product.productId.price}` },
        {
            header: "Total Price",
            accessor: (product: ICartProduct) =>
                `$${product.quantity * product.productId.price}`,
        },
        {
            header: "Actions",
            accessor: (product: ICartProduct) => (
                <div className={style.cart_actions__wrapper}>
                 {isDeleteTriggered === product.productId._id    ? <>
                 <input
                 name="quantityField"
                        type="number"
                        min="1"
                        value={deleteQuantity}
                        onChange={(e) => setDeleteQuantity(Number(e.target.value))}
                    />
                    <button onClick={() => setTargetItem(product._id)}>Remove</button>
                    <button onClick={()=> {setIsDeleteTriggered(undefined)}}><IoClose/></button>
                    </>:<button onClick={()=> {setIsDeleteTriggered(product.productId._id)}}>Delete</button>}
                    </div>
            ),
        },
    ];

  

    async function getCartProductsFn() {
        try {
            const result = await getCartProducts();
            setCartData(result);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDeleteFromCart(id: string, quantity: number) {
        try {
            await deleteFromCart(id, quantity);
            setIsDeleteTriggered(undefined)
            setCartData((prevData) => {
                if (!prevData) return null;
                return {
                    ...prevData,
                    products: prevData.products.reduce((acc, cartItem) => {
                        if (cartItem._id === id) {
                            if (cartItem.quantity > quantity) {
                                acc.push({
                                    ...cartItem,
                                    quantity: cartItem.quantity - quantity,
                                });
                            }
                        } else {
                            acc.push(cartItem);
                        }
                        return acc;
                    }, [] as ICartProduct[]),
                };
            });
            setTargetItem(null);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        void getCartProductsFn();
    }, []);

    const totalPrice = cartData ? calculateTotalPrice(cartData.products) : 0;


    if(cartData === null){
        return <h3>Loading Data</h3>
    }else if(cartData.products.length === 0){
        return <h3>Cart Is Empty</h3>
    }else {
        return (
            <div className={style.cartContainer}>
                <SetMetaInfo title="Cart" description="Cart of the authenticated user" />
                <h2>Your Cart</h2>
              
          <>
                {cartData && (
                    <div className={style.cart_table_wrapper}>
                        <div className={style.cart_table_box}>
                    <GenericTable
                        columns={columns}
                        data={cartData.products}
                    />
                    </div>
                    <div className={style.cart_checkout_box}>
                    <ProceedToCheckout totalPrice={totalPrice} />
                    </div>
                    </div>
                )}
                {targetItem && (
                    <DeleteConfirmationDialog
                        onConfirm={() => handleDeleteFromCart(targetItem, deleteQuantity)}
                        deletionState={targetItem}
                        setDeletionState={setTargetItem}
                    />
                )}
            </>
            </div>
        );
    }
};

export default CartPage;