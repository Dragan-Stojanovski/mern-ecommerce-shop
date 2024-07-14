
import { useState } from 'react';
import ProductForm from './components/product-form';
import ProductTable from './components/product-table';
import BaseButton from '../../../../../components/base-ui/base-button';
import style from './ProductPage.module.css';
const ProductPage = ():JSX.Element=>  {
  const [addProductFormIsVissible, setAddProductFormIsVissible] = useState(false);

  return(
  <div className={style.product_admin_page__container}>
   <BaseButton type="button" content="Add Product" onClick={() => setAddProductFormIsVissible(true)} />
  {addProductFormIsVissible && <ProductForm setAddProductFormIsVissible={setAddProductFormIsVissible} /> }
<div className={style.product_table_wrapper}><ProductTable /> </div>
</div>
  )
}

export default ProductPage;