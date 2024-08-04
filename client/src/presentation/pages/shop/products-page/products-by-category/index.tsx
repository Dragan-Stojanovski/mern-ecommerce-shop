import { useEffect, useState } from "react";
import { getProductsByCategory } from "../../../../../data/content/product/getProductsByCategory";
import { useParams } from "react-router-dom";
import styles from './ProductsByCategory.module.css';
import { IGetProductRequest } from "../../../../../domain/usecases/content/product";
const ProductsByCategory = ():JSX.Element => {
    const [products,setProducts] = useState<IGetProductRequest[]|null>(null)
    const { category } = useParams<{ category: string }>();
    const trimmedCategory = category?.replace("category=", "");


    useEffect(() => {
        if (trimmedCategory) {
            const fetchProducts = async () => {
                try {
                    const result = await getProductsByCategory(trimmedCategory);
                    console.log(result.data)
                    setProducts(result.data);  
                } catch (error) {
                    console.log(error);
                }
            };

            fetchProducts();  
        } 
    }, [category]);
if(products === null){
    return<h2>Loading...</h2>
}else if(products.length===0){
    return <h2>No results to be shown</h2>
}else{
    return(
        <div className={styles.container}>
        <div className={styles.popular_products__header}>
<h4>Home/{trimmedCategory}</h4>
<h2><span>{trimmedCategory}</span></h2>
</div>
<div className={styles.product_wrapper}>
{products?.map((item:IGetProductRequest) => (
<a href={`/details/id=${item._id}`} key={item.name} className={styles.product_box}>
<div className={styles.product_image__wrapper}>
<img src={item.productImages ?? ''} alt={item.name ?? ''} />
</div>
<h3>{item.name}</h3>
<h4>${item.price}.00</h4>
</a>
)) }
</div>

    </div>
    )
}
    
}

export default ProductsByCategory;