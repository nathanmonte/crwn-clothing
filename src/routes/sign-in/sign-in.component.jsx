import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import { auth, createUserDocumentFromAuth, signInWithGooglePopup, signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils";


const SignIn = () => {

    // Effect is used as soon as the component mounts.
    // As we are provided no dependencies it will not get retriggered on changes as it should only happen on page load.
    useEffect(() => {
        async function fetchRedirectResult() {
            const response = await getRedirectResult(auth);
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        }
        fetchRedirectResult();
    }, []);

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const { user } = response;
        const userDocRef = createUserDocumentFromAuth(user);
    }

    return (<div>
        <button onClick={logGoogleUser}>
            Sign in with google popup
        </button>
        <button onClick={signInWithGoogleRedirect}>
            Sign in with google redirect
        </button>
    </div>);
}

export default SignIn;