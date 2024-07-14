import { useForm } from "react-hook-form";
import { SetStateAction, useState } from "react";
import styles from './PartnersForm.module.css';
import TextField from "../../../../../../../components/base-ui/text-field";
import BaseButton from "../../../../../../../components/base-ui/base-button";
import { Dispatch } from "react";
import { addPartner } from "../../../../../../../../data/content/partners/addPartner";
import { IAddPartnerRequest } from "../../../../../../../../domain/usecases/content/partner";

export interface ICategoriesFormProps  {
    setIsModeVisible: Dispatch<SetStateAction<boolean>>;
}

const PartnersForm = ({setIsModeVisible}:ICategoriesFormProps):JSX.Element => {
    const [successMessage, setSuccessMessage] = useState<string | undefined>()
    const { handleSubmit, control } = useForm<IAddPartnerRequest>({
        mode: "onChange",
      });

    async function createPartnerFn(data:IAddPartnerRequest) {
        try{
            await addPartner(data);
            setSuccessMessage("Partner succesfully added")
            setTimeout(() => {
                setSuccessMessage(undefined)
            }, 2000)
        }catch(error){
            console.log(error);
        }
    }
    
    
  
    return (
        
         <div className={styles.partners_form__wrapper}>
<div className={styles.backdrop} onClick={() => setIsModeVisible(false)} />

        <form onSubmit={handleSubmit((formData) => {
            createPartnerFn({
                imageUrl:formData.imageUrl,
                imageAltText:formData.imageAltText
            })
        })}>
            {successMessage && <div className={styles.success_message}> {successMessage}</div>}
<h3>Add Partner</h3>
            <div className={styles.partners_form__box}>
            <TextField
                  name="imageUrl"
                  type="text"
                  label="Image Url"
                  testId="imageField"
                  control={control}
                  rules={{
                    required: "Image Url is required",
                  }}
                />
            </div>
    
            <div className={styles.partners_form__box}>
            <TextField
                  name="imageAltText"
                  type="text"
                  label="Alt Text"
                  testId="altTextField"
                  control={control}
                  rules={{
                    required:"Alt Text is required",
                  }}
                />
            </div>
    
            <div className={styles.partners_page_btn}>
                <BaseButton type="submit" content="Add Partner" />
              </div>
    
        </form>
        </div>

    )
}

export default PartnersForm;