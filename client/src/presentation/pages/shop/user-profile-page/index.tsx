import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../domain/usecases/store/rootState";
import { IUpdateUserOwnRequest } from "../../../../domain/usecases/user/updated-user-own";
import { updateUserOwn } from "../../../../data/user/updateUserOwn";
import styles from './UserProfilePage.module.css';
import { GiEgyptianProfile } from "react-icons/gi";
import { FaShieldAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import TextField from "../../../components/base-ui/text-field";
import BaseButton from "../../../components/base-ui/base-button";
import { SlSymbolMale } from "react-icons/sl";
import { SlSymbleFemale } from "react-icons/sl";
import { useState } from "react";
import ChangeOwnPassword from "./change-own-password";
import { fetchUserDirectly } from "../../../../domain/store/actions/getUserOwn";
import SetMetaInfo from "../../../../infra/utility/SetMetaInfo";

const UserProfilePage = ():JSX.Element => {
    const userOwnData = useSelector((state: IRootState) => state.user);
    const [successMessage, setSuccessMessage] = useState<string | undefined>()
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const [changePasswordIsVissible, setChangePasswordIsVissible] = useState<boolean>(false)
    const [currentGender,setCurrentGender] = useState(userOwnData?.gender);
    const dispatch = useDispatch();

    const { handleSubmit, control } = useForm<IUpdateUserOwnRequest>({
        mode: "onChange",
        defaultValues:{
            username:userOwnData?.username,
            email:userOwnData?.email,
            firstName:userOwnData?.firstName,
            secondName:userOwnData?.secondName,
            phone:userOwnData?.phone,
            gender:userOwnData?.gender,
        }
      });

    async function updatedUserOwnFn(requestBody:IUpdateUserOwnRequest){
        try{
            if(userOwnData?._id){
            await updateUserOwn(userOwnData?._id, requestBody) 
            setSuccessMessage("Updated User Own Data")
            setTimeout(() => {
                setSuccessMessage(undefined);
            }, 2000)
            fetchUserDirectly(dispatch);
            }
        }catch(error){
            setErrorMessage(error.response?.data.message || "An error occurred during registration.")
        }
    }

    function setUserGender(value:string){
        setCurrentGender(value)
    }

    return (
        <section className={styles.profile_page__section}>
            <SetMetaInfo title={`${userOwnData?.username} Profile`} description={"User Profile Page"} />
            { changePasswordIsVissible && <ChangeOwnPassword setIsModeVisible={setChangePasswordIsVissible}/>}
        <div className={styles.user_profile_page__container}> 
    <div className={styles.user_profile_page__wrapper}> 

<div className={styles.user_profile_info__wrapper}>
    <GiEgyptianProfile />
<h1>{userOwnData?.username}</h1>
<div>
<BaseButton onClick={() => setChangePasswordIsVissible(true)} type={"button"} content={"Change Password"} />
</div>
</div>

<div className={styles.user_profile_personal_information__wrapper}>
        <div className={styles.user_profile_pesonal_information_header__wrapper}>
        <div className={styles.user_profile_pesonal_information_header__box}>
<FaShieldAlt />
        </div>

        <div className={styles.user_profile_pesonal_information_header__box}>
        <h2>Personal Information</h2>
        <p>This section provides an overview of your basic details and contact information. It includes essential data such as your name, email address, phone number, and profile picture, which help others identify and connect with you.</p>
</div>
        </div>

        <div className={styles.personal_information_form__wrapper}>
            
        <form onSubmit={handleSubmit((formData:IUpdateUserOwnRequest) => {
            updatedUserOwnFn({
                username:formData.username,
                email:formData.email,
                firstName:formData.firstName,
                secondName:formData.secondName,
                phone:formData.phone,
                gender:currentGender,
            })
        })}>
            {successMessage ?? <div>{successMessage}</div>}
<div className={styles.personal_information_form_fields__box}>
<TextField
                  name="username"
                  type="text"
                  label="Username"
                  testId="usernameField"
                  control={control}
                  rules={{
                    required: "Username is required",
                  }}
                />
</div>
<div className={styles.personal_information_form_fields__box}>
<TextField
                  name="email"
                  type="text"
                  label="Email"
                  testId="emailField"
                  control={control}
                  rules={{
                    required: "Email is required",
                  }}
                />
</div>
<div className={styles.personal_information_firstname_lastname__wrapper}>
<div className={styles.personal_information_form_fields__box}>
<TextField
                                        name="firstName"
                                        type="text"
                                        label="First name"
                                        testId="firstNameField"
                                        control={control}/>
</div>
<div className={styles.personal_information_form_fields__box}>
<TextField
                                        name="secondName"
                                        type="text"
                                        label="Last Name"
                                        testId="secondNameField"
                                        control={control}/>
</div>
</div>
<div className={styles.personal_information_form_fields__box}>
<TextField
                                        name="phone"
                                        type="text"
                                        label="Phone"
                                        testId="phoneField"
                                        control={control}/>
</div>

<div className={styles.personal_information_form_fields_gender__box}>
<button type="button" className={currentGender==='male' ? styles.active_gender : ''} onClick={()=> setUserGender('male')}><SlSymbolMale /></button>
    <button type="button" className={currentGender==='female' ? styles.active_gender : ''} onClick={()=> setUserGender('female')}><SlSymbleFemale/></button>
</div>
<br></br>
{errorMessage ? <div>{errorMessage} </div>: null}
<div className={styles.personal_information_form_button__box}>
<BaseButton type={"submit"} content={"Save"} />
</div>
            </form>
        </div>
</div>


    </div>

    </div>
    </section>)
}

export default UserProfilePage;