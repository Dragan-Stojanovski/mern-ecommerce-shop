import style from '../../ProductPage.module.css';
import { Dispatch, SetStateAction, useState } from 'react';
import { createProduct } from '../../../../../../../../data/content/product/createProduct';
import { ICreateProductRequest } from '../../../../../../../../domain/usecases/content/product';
import { useForm } from 'react-hook-form';
import TextField from '../../../../../../../components/base-ui/text-field';
import QuillEditor from '../../../../../../../components/base-ui/quil-editor';
import BaseButton from '../../../../../../../components/base-ui/base-button';


export interface IProductFormProps  {
    setAddProductFormIsVissible: Dispatch<SetStateAction<boolean>>;
}



const ProductForm = ({setAddProductFormIsVissible}:IProductFormProps):JSX.Element => {
    const [successMessage, setSuccessMessage] = useState<string | undefined>()
    const { handleSubmit, control } = useForm<ICreateProductRequest>({
        mode: "onChange",
      });
    async function createProductFn(data:ICreateProductRequest){
    try{
        await createProduct(data);
        setSuccessMessage("Partner succesfully added")
        setTimeout(() => {
            setSuccessMessage(undefined)
        }, 2000)
    }catch(error){
        console.log(error)
    }
}
    return(
    <div className={style.container}>
        <div className={style.backdrop} onClick={() => setAddProductFormIsVissible(false)} />

   <form onSubmit={handleSubmit((formData) => {
            createProductFn({
                name:formData.name,
                price:formData.price,
                description:formData.description,
                category:formData.category,
                marketingLabel:formData.marketingLabel,
                productImages:formData.productImages
            })
        })}>
            {successMessage && <div className={style.success_message}> {successMessage}</div>}
<h3>Add Partner</h3>

<div className={style.partners_form__box}>
            <TextField
                  name="name"
                  type="text"
                  label="Name"
                  testId="name"
                  control={control}
                  rules={{
                    required: "Name is required",
                  }}
                />
            </div>

            <div className={style.partners_form__box}>
            <TextField
                  name="price"
                  type="number"
                  label="Price"
                  testId="price"
                  control={control}
                  rules={{
                    required: "Price is required",
                  }}
                />
            </div>

            <div className={style.partners_form__box}>
                <QuillEditor name='description' control={control}                   rules={{
                    required: "Description is required",
                  }} />
            </div>

            <div className={style.partners_form__box}>
            <TextField
                  name="category"
                  type="text"
                  label="Category"
                  testId="category"
                  control={control}
                  rules={{
                    required: "Category is required",
                  }}
                />
            </div>

            <div className={style.partners_form__box}>
            <TextField
                  name="marketingLabel"
                  type="text"
                  label="Marketing Label"
                  testId="category"
                  control={control}
                  rules={{
                    required: "Marketing Label is required",
                  }}
                />
            </div>

            <div className={style.partners_form__box}>
            <TextField
                  name="productImages"
                  type="text"
                  label="Product Images"
                  testId="productImages"
                  control={control}
                  rules={{
                    required: "Product Image is required",
                  }}
                />
            </div>

            <div className={style.partners_page_btn}>
                <BaseButton type="submit" content="Add Product" />
              </div>

</form>
    </div>
    )
}

export default ProductForm;