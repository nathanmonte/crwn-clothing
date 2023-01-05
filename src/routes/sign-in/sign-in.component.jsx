import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";


const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const { user } = response;
        const userDocRef = createUserDocumentFromAuth(user);
    }

    return (<div>
        <button onClick={logGoogleUser}>
            Sign in with google popup
        </button>
    </div>);
}

export default SignIn;