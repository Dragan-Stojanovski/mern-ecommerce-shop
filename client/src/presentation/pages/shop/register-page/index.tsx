import { useForm } from "react-hook-form";
import TextField from "../../../components/base-ui/text-field";
import styles from "./RegisterPage.module.css";
import { registerNewUser } from "../../../../data/user/registerUser";
import BaseButton from "../../../components/base-ui/base-button";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SetMetaInfo from "../../../../infra/utility/SetMetaInfo";
import { IRegisterUserRequestBody } from "../../../../domain/usecases/user/registerUser";

/**
 * Interface representing the fields of the registration form.
 *
 * @param email - The email address of the user.
 * @param username - The username for the user's account.
 * @param password - The password for the user's account.
 * @param repeatPassword - An optional field for repeating the password, used for validation.
 */
export interface IRegisterFormFields {
  email: string;
  username: string;
  password: string;
  repeatPassword?: string;
}

/**
 * Represents the registration page component where users can create a new account.
 * This component handles user input for registration and manages the state
 * for success and error messages. It uses `registerUserFn` to perform the actual
 * registration of the user.
 *
 * @returns The JSX.Element representing the registration page.
 */
const RegisterPage: React.FC = (): JSX.Element => {
  const { handleSubmit, control, watch, trigger, formState } = useForm<IRegisterFormFields>({
    mode: "onChange",
  });
  const [errorMsg, setErrorMsg] = useState<undefined | string>(undefined);
  const [successMsg, setSuccessMsg] = useState<undefined | string>(undefined);
  const navigate = useNavigate();

  /**
   * Asynchronously registers a new user with the provided form data.
   * On successful registration, displays a success message.
   * In case of an error, sets an error message.
   *
   * @param data - {@link IRegisterUserRequestBody} The data from the registration form.
   * @returns The result of the registration process.
   */
  async function registerUserFn(data: IRegisterUserRequestBody) {
    console.log("Register Data",data)

    try {
      await registerNewUser(data);
      setSuccessMsg("Registration successful!");
      setTimeout(() => {
        setSuccessMsg(undefined);
        navigate('/login');
      }, 3000);
    } catch (error) {
        setErrorMsg(error.response?.data.message || "An error occurred during registration.");
    }
  }

  const passwordField = watch('password');

  useEffect(() => {
    if (formState.dirtyFields.repeatPassword) {
      trigger('repeatPassword');
    }
  }, [passwordField]);

  return (
    <Fragment>
      <SetMetaInfo title="Register Page" description="Welcome Get Started" />
      <div className={styles.register_page_wrapper}>
        {successMsg && <div className={styles.success_msg}>{successMsg}</div>}
        {errorMsg && successMsg === undefined && <div className="errors_msg">{errorMsg}</div>}
        <div className={styles.register_page__header}>
          <h1>Register your account</h1>
        </div>
        <form
          onSubmit={handleSubmit((formData) => {
            registerUserFn({
              email: formData.email,
              username: formData.username,
              password: formData.password,
            });
          })}
        >
          <div className={styles.register_page__field}>
            <TextField
              name="email"
              type="text"
              label="Email"
              testId="registerEmailField"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
            />
          </div>
          <div className={styles.register_page__field}>
            <TextField
              name="username"
              type="text"
              label="Username"
              testId="registerUsernameField"
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
              }}
            />
          </div>
          <div className={styles.register_page__field}>
            <TextField
              name="password"
              type="password"
              label="Password"
              testId="registerPasswordField"
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
          </div>
          <div className={styles.register_page__field}>
            <TextField
              name="repeatPassword"
              type="password"
              label="Repeat Password"
              testId="registerRepeatPasswordField"
              control={control}
              rules={{
                required: "Required",
                validate: {
                  matchesPassword: (value: string) =>
                    value === control._formValues.password ||
                    "Must match password",
                },
              }}
            />
          </div>
          <div className={styles.register_page_btn}>
            <BaseButton type="submit" content="Register" />
          </div>
        </form>
        <div className={styles.already_registered_msg}>
          Already on E-commerce?<Link to="/login"> Sign in</Link>{" "}
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterPage;