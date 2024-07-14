import { useEffect, useState } from 'react';
import { getProducts } from '../../../../../../../../data/content/product/getProducts';
import { IGetProductRequest } from '../../../../../../../../domain/usecases/content/product';
import BaseTable from '../../../../../components/base-table';
import { deleteProduct } from '../../../../../../../../data/content/product/deleteProduct';
import DeleteConfirmationDialog from '../../../../../components/delete-confirmation-dialog';

const ProductTable = ():JSX.Element => {
    const [productData,setProductData] = useState<null | [] | IGetProductRequest[]>(null)
    const [deletionState, setDeletionState] = useState<string | null>(null);
    const productsFilter:IGetProductRequest = {
        name: null,
        price: null,
        description: null,
        category: null,
        marketingLabel: null,
        productImages: null
       }
    async function getProductsFn() {
        try {
          const result = await getProducts(productsFilter);
          setProductData(result.data);
          
        } catch (error) {
          console.log(error);
        }
      }
    
      async function handleDeleteProduct(id: string) {
        try {
          await deleteProduct(id);
          productData && setProductData(productData.filter(product => product._id !== id));
          setDeletionState(null); 
        } catch (error) {
          console.log(error);
        }
      }
      
  useEffect(() => {
    getProductsFn();
  }, []);

    return (
    <>
    <BaseTable data={productData} onDelete={setDeletionState} />
    {deletionState &&
        <DeleteConfirmationDialog
          deletionState={deletionState}
          setDeletionState={setDeletionState}
          onConfirm={() => handleDeleteProduct(deletionState)}
        />}
    </>)
}

export default ProductTable;