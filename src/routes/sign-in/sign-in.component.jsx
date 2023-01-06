
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const SignIn = () => {

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const { user } = response;
        const userDocRef = createUserDocumentFromAuth(user);
    }

    return (<div>
        <h1>Sign In Page</h1>
        <button onClick={logGoogleUser}>
            Sign in with google popup
        </button>
        <SignUpForm></SignUpForm>
    </div>);
}

export default SignIn;