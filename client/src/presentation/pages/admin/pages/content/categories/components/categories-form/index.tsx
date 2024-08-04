import { useForm } from "react-hook-form";
import { SetStateAction, useState } from "react";
import styles from '../../Categories.module.css';
import TextField from "../../../../../../../components/base-ui/text-field";
import BaseButton from "../../../../../../../components/base-ui/base-button";
import { addCategory } from "../../../../../../../../data/content/categories/addCategory";
import { Dispatch } from "react";
import { ICategory } from "../../../../../../../../domain/usecases/content/categories";

export interface ICategoriesFormProps  {
    setIsModeVisible: Dispatch<SetStateAction<boolean>>;
}

const CategoriesForm = ({setIsModeVisible}:ICategoriesFormProps):JSX.Element => {
    const [successMessage, setSuccessMessage] = useState<string | undefined>()
    const { handleSubmit, control } = useForm<ICategory>({
        mode: "onChange",
      });

    async function createCategoryFn(data:ICategory) {
        try{
            await addCategory(data);
            setSuccessMessage("Category succesfully added")
            setTimeout(() => {
                setSuccessMessage(undefined)
            }, 2000)
        }catch(error){
            console.log(error);
        }
    }
    
    
  
    return (
        <>
        {successMessage && <div className={styles.success_message}> {successMessage}</div>}
<div className={styles.backdrop} onClick={() => setIsModeVisible(false)} />

        <form onSubmit={handleSubmit((formData) => {
            createCategoryFn({
                label:formData.label,
                path:formData.path
            })
        })}>
<h3>Add Category</h3>
            <div className={styles.categories_form__box}>
            <TextField
                  name="label"
                  type="text"
                  label="Label"
                  testId="labelField"
                  control={control}
                  rules={{
                    required: "Label is required",
                  }}
                />
            </div>
    
            <div className={styles.categories_form__box}>
            <TextField
                  name="path"
                  type="text"
                  label="Path"
                  testId="pathField"
                  control={control}
                  rules={{
                    required:"Path is required",
                  }}
                />
            </div>
    
            <div className={styles.categories_page_btn}>
                <BaseButton type="submit" content="Add Category" />
              </div>
    
        </form>
        </>
    )
}

export default CategoriesForm;