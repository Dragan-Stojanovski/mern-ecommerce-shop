import { useForm } from "react-hook-form";
import { changeOwnPassword } from "../../../../../data/user/changeOwnPassword";
import { IChangeOwnPassword } from "../../../../../domain/usecases/user/IChangeOwnPassword";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TextField from "../../../../components/base-ui/text-field";
import BaseButton from "../../../../components/base-ui/base-button";
import styles from './ChangeOwnPassword.module.css';

export interface IChangeOwnPasswordProps {
    setIsModeVisible: Dispatch<SetStateAction<boolean>>;
}


const ChangeOwnPassword =({setIsModeVisible}:IChangeOwnPasswordProps ):JSX.Element=> {
    const [successMessage, setSuccessMessage] = useState<string | undefined>()
    const [errorMessage, setErrorMessage] = useState<string | undefined>()

    const { handleSubmit, control, trigger,watch,formState } = useForm<IChangeOwnPasswordForm>({
        mode: "onChange",
      });

    async function changeOwnPasswordFn(requestBody:IChangeOwnPassword){
        try{
            await changeOwnPassword(requestBody)
            setSuccessMessage("Updated User Own Data")
            setTimeout(() => {
                setSuccessMessage(undefined);
            }, 2000)
        }catch(error){
            setErrorMessage(error.response?.data.message || "An error occurred during registration.")

        }
    }


    const passwordField = watch('newPassword');

    useEffect(() => {
      if (formState.dirtyFields.repeatPassword) {
        trigger('repeatPassword');
      }
    }, [passwordField]);

    return (<div>
<div className={styles.backdrop} onClick={() => setIsModeVisible(false)} />

<form className={styles.change_password_form__wrapper} onSubmit={handleSubmit((formData:IChangeOwnPassword) => {
            changeOwnPasswordFn({
                oldPassword:formData.oldPassword,
                newPassword:formData.newPassword,
            })
        })}>
            {successMessage ? <div>{successMessage}</div> : null}

            <TextField
                  name="oldPassword"
                  type="password"
                  label="Old Password"
                  testId="oldPasswordField"
                  control={control}
                  rules={{
                    required: "Old password is required",
                  }}
                />
<TextField
                  name="newPassword"
                  type="password"
                  label="New Password"
                  testId="newPasswordField"
                  control={control}
                  rules={{
                    required: "Required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 chars",
                    },
                    maxLength: {
                      value: 15,
                      message: "Maximum 15 chars",
                    },
                    validate: {
                      hasUppercase: (value: string) =>
                        /[A-Z]/.test(value) || "Include 1 uppercase",
                      hasLowercase: (value: string) =>
                        /[a-z]/.test(value) || "Include 1 lowercase",
                      hasNumber: (value: string) =>
                        /\d/.test(value) || "Include 1 number",
                      hasSymbol: (value: string) =>
                        /[@$!%*?&]/.test(value) || "Include 1 symbol",
                    },
                  }}
                />
<TextField
                  name="repeatPassword"
                  type="password"
                  label="Repeat Password"
                  testId="repeatPasswordField"
                  control={control}
                  rules={{
                    required: "Required",
                    validate: {
                      matchesPassword: (value: string) =>
                        value === control._formValues.newPassword ||
                        "Must match password",
                    },
                  }}
                />
<br></br>
{errorMessage ? <div>{errorMessage} </div>: null}
                <BaseButton type={"submit"} content={"Save"} />





            </form>
    </div>)



}

export default ChangeOwnPassword;