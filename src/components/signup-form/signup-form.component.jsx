import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignUpContainer } from './signup-form.styles';
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch();
    const resetFormFields = () => setFormFields(defaultFormFields);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
            
        } catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('You already have an account with that email address!');
                return;
            }
            console.log('user creation encountered an error', error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({...formFields, [name]: value });
    }

  return (
    <SignUpContainer>
        <h2>Don't have an account?</h2>
        <span>Sign Up with Email and Password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label='Display Name' required type="text" onChange={handleChange} name='displayName' value={displayName} />
            <FormInput label='Email' required type="email" onChange={handleChange} name='email' value={email} />
            <FormInput label='Password' required type="password" onChange={handleChange} name='password' value={password} />
            <FormInput label='Confirm Password' required type="password" onChange={handleChange} name='confirmPassword' value={confirmPassword} />
            <Button type="submit">Enviar</Button>
        </form>
    </SignUpContainer>
  )
}

export default SignUpForm;