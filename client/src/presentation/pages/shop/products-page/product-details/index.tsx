import { useParams } from "react-router-dom";
import { getProductDetails } from "../../../../../data/content/product/getProductDetails";
import { ICreateProductResponse } from "../../../../../domain/usecases/content/product";
import { useEffect, useState } from "react";
import style from './ProductDetails.module.css';

const ProductDetails = ():JSX.Element => {
    const { id } = useParams<{ id: string }>();
const [productDetails, setProductDetails] = useState<ICreateProductResponse | null>(null)
const trimmedId = id?.replace("id=", "");
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


return(<div className={style.product_details__wrapper}>
    <div className={style.product_details__box}>
<img src={productDetails?.data.productImages} alt={productDetails?.data.name} />
    </div>
    <div className={style.product_details__box}>
    <h5>{productDetails?.data.category}</h5>
    <h1>{productDetails?.data.name}</h1>
    <h4><span>${productDetails?.data.price}.00</span> & Free Shipping</h4>
    <div dangerouslySetInnerHTML={{ __html: productDetails?.data.description || '' }} />
</div>
</div>) 
}

export default ProductDetails;