import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { ButtonsContainer, SignInContainer } from './signin-form.styles';
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

const defaultFormFields = {
    email: '',
    password: '',
}

const SigninForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password } = formFields;
    const dispatch = useDispatch(); 
    const resetFormFields = () => setFormFields(defaultFormFields);

    const signinWithGoogle = async () => {
        dispatch(googleSignInStart());
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect Password for email!')
                    break;
                case 'auth/user-not-found':
                    alert('User not found!')
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({...formFields, [name]: value });
    }

  return (
    <SignInContainer>
        <h2>Already have an account?</h2>
        <span>Sign In with Email and Password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label='Email' required type="email" onChange={handleChange} name='email' value={email} />
            <FormInput label='Password' required type="password" onChange={handleChange} name='password' value={password} />
           <ButtonsContainer>
           <Button type="submit">Entrar</Button>
            <Button type='button' onClick={signinWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google sign in</Button>
           </ButtonsContainer>
        </form>
    </SignInContainer>
  )
}

export default SigninForm;