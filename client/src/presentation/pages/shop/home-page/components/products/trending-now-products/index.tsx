import { useEffect, useState } from 'react';
import { getProducts } from '../../../../../../../data/content/product/getProducts';
import { IGetProductRequest } from '../../../../../../../domain/usecases/content/product';
import styles from './TrendingNowProducts.module.css';
const TrendingNowProducts = ():JSX.Element => {
   const trendingProductsFilter:IGetProductRequest = {
    name: null,
    price: null,
    description: null,
    category: null,
    marketingLabel: "Trending",
    productImages: null
   }
   const [trendingProducts,setTrendingProducts] = useState<IGetProductRequest[]|undefined>()

   async function getProductsFn(){
    try{
    const result = await getProducts(trendingProductsFilter);
    setTrendingProducts(result.data);
    }catch(error){
        console.log(error)
    }
}

useEffect(() => {
    void getProductsFn();
}, [])

    return (
        <div className={styles.container}>
            <div className={styles.popular_products__header}>
<h4>Popular Products</h4>
<h2>Trend<span>in</span>g Now</h2>
</div>
<div className={styles.product_wrapper}>
{trendingProducts?.map((item:IGetProductRequest) => (
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

export default TrendingNowProducts;