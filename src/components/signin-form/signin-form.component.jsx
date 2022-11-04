import { useState } from "react";
import { createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './signin-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SigninForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password } = formFields;

    const resetFormFields = () => setFormFields(defaultFormFields);

    const signinWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
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
    <div className="sign-up-container">
        <h2>Already have an account?</h2>
        <span>Sign In with Email and Password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label='Email' required type="email" onChange={handleChange} name='email' value={email} />
            <FormInput label='Password' required type="password" onChange={handleChange} name='password' value={password} />
           <div className="buttons-container">
           <Button type="submit">Entrar</Button>
            <Button type='button' onClick={signinWithGoogle} buttonType='google'>Google sign in</Button>
           </div>
        </form>
    </div>
  )
}

export default SigninForm;