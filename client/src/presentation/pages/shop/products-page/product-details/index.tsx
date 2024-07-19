import { Link, useParams } from "react-router-dom";
import { getProductDetails } from "../../../../../data/content/product/getProductDetails";
import { ICreateProductResponse } from "../../../../../domain/usecases/content/product";
import { useEffect, useState } from "react";
import style from './ProductDetails.module.css';
import { IAddToCartRequest } from "../../../../../domain/usecases/user/cart/ICart";
import { addToCart } from "../../../../../data/user/cart/addToCart";
import SetMetaInfo from "../../../../../infra/utility/SetMetaInfo";
import BaseButton from "../../../../components/base-ui/base-button";
import { IRootState } from "../../../../../domain/usecases/store/rootState";
import { useSelector } from "react-redux";

const ProductDetails = ():JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const username = useSelector((state: IRootState) => state.user?.username);
const [productDetails, setProductDetails] = useState<ICreateProductResponse | null>(null);
const [success,setSuccess] = useState(false);
const trimmedId = id?.replace("id=", "");
let [quantity,setQuantity] = useState(1);
async function getProductDetailsFn(productId:string){
    try{
        const result = await getProductDetails(productId);
            setProductDetails(result);
    }catch(error){
        console.log(error)
    }
}

useEffect(() => {
    if(trimmedId){
    void getProductDetailsFn(trimmedId)
    }
}, [id])

async function addToCartFn(body:IAddToCartRequest) {
    try {
        await addToCart(body);
        setSuccess(true);
        setTimeout(() =>{
            setSuccess(false)
        }, 2000)
    } catch (error) {
        console.log(error);
    }
}




return(
<>
<SetMetaInfo title={productDetails?.data.name} description={`Details for the product ${productDetails?.data.name}`} />
<div className={style.product_details__wrapper}>
    <div className={style.product_details__box}>
<img src={productDetails?.data.productImages} alt={productDetails?.data.name} />
    </div>
    <div className={style.product_details__box}>
    <h5>{productDetails?.data.category}</h5>
    <h1>{productDetails?.data.name}</h1>
    <h4><span>${productDetails?.data.price}.00</span> & Free Shipping</h4>
    <div dangerouslySetInnerHTML={{ __html: productDetails?.data.description || '' }} />
  <br></br>
 {username ? <>
   <button className={style.quantity_button} disabled = {quantity <= 1 } onClick={() => setQuantity(quantity-1)}>-</button>
   <button className={style.quantity_button}>{quantity}</button><button className={style.quantity_button} onClick={() => setQuantity(quantity+1)}>+</button> <BaseButton onClick={() => {
                    if (trimmedId) {
                        addToCartFn({ productId: trimmedId, quantity: quantity });
                    }
                } } type={"button"} content={!success ? `Add To Cart` : 'Added To Cart'} /> {success &&<Link to="/cart">View Cart</Link>}
</> : <span><Link to="/login">Login To Be Able To Add To Cart</Link></span>}
</div>
</div> </>) 
}

export default ProductDetails;