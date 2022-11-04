import SignUpForm from "../../components/signup-form/signup-form.component";
import SignInForm from "../../components/signin-form/signin-form.component";
import './authentication.styles.scss'

const Authentication = () => {
 
  return (
    <div className="authencation-container">
      <SignInForm />
      <SignUpForm />
    </div>
  )
}

export default Authentication;