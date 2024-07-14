import { useForm } from 'react-hook-form';
import styles from './LoginPage.module.css';
import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IAuthenticateUserRequest } from '../../../../domain/usecases/user/loginUser';
import { authenticateUser } from '../../../../data/user/authenticateUser';
import SetMetaInfo from '../../../../infra/utility/SetMetaInfo';
import TextField from '../../../components/base-ui/text-field';
import BaseButton from '../../../components/base-ui/base-button';
import { fetchUserDirectly } from '../../../../domain/store/actions/getUserOwn';
import { useDispatch } from 'react-redux';

const LoginPage = ():JSX.Element =>  {
    const { handleSubmit, control } = useForm<IAuthenticateUserRequest>({
        mode: "onChange",
      });
      const [errorMsg, setErrorMsg] = useState<undefined | string>(undefined);
      const navigate = useNavigate();
      const dispatch = useDispatch();
 /**
   * Asynchronously authenticates an user with the provided form data.
   * On successful authentications, redirects user to the home page.
   * In case of an error, sets an error message.
   *
   * @param data - {@link IAuthenticateUserRequest} The data used for the authentication.
   * @returns The result of the authentication process.
   */
      async function authenticateUserFn(data:IAuthenticateUserRequest) {
        try {
            let response= await authenticateUser(data);
            localStorage.setItem("jwt",response.data.token);
            fetchUserDirectly(dispatch);
            navigate('/');
        }catch(error) {
            setErrorMsg(error.response?.data.message || "An error occurred during authentication.");
        }
      }
    return (
        <Fragment>
                  <SetMetaInfo title="Login Page" description="Login" />
                  <div className={styles.login_page__wrapper}>
                  {errorMsg && <div className="errors_msg">{errorMsg}</div>}
                  <div className={styles.login_page__header}>
          <h1>Log In</h1>
        </div>
        <form
          onSubmit={handleSubmit((formData) => {
            authenticateUserFn({
              username: formData.username,
              password: formData.password,
            });
          })}
        >
  <div className={styles.login_page__field}>
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

          <div className={styles.login_page__field}>
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
    
          <div className={styles.login_page_btn}>
            <BaseButton type="submit" content="Log In" />
          </div>
          <div className={styles.already_authenticated_msg}> New? <Link to="/register">Join now</Link></div>
            </form>
                  </div>

        </Fragment>
    )
}

export default LoginPage;