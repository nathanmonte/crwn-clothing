import Button from "../button/button.component"
import FormInput from "../form-input/form-input.component"
import { createUserDocumentFromAuth, getUserDocument, signInWithEmailAndPassword, signInWithGoogleEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { useState } from "react";
import "./sign-in-form.styles.scss";



const formFieldDefaults = {
    email: "",
    password: ""
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(formFieldDefaults);
    const { email, password } = formFields;

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const { user } = response;
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await signInWithGoogleEmailAndPassword(email, password);
            const document = await getUserDocument(userCredential.user.uid);
            console.log(document);
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Failed to sign in. Please check your email and password and try again.");
                    break;
                case "auth/user-not-found":
                    alert("Failed to sign in. Please check your email and password and try again.");
                    break;
                default:
                    alert("Unexpected error");
                    console.log(error);
            }
        }

    }



    return <div >
        <h1>I already have an account</h1>
        <h2>Sign in with your email and password</h2>
        <form onSubmit={handleSubmit} className="sign-in-form">
            <FormInput type="email" name="email" value={email} onChange={handleChange} required />
            <FormInput type="password" name="password" value={password} onChange={handleChange} required />

            <div className="buttons-container">
                <Button type="submit">SIGN IN</Button>
                <Button buttonType="google" type="button" onClick={() => {
                    console.log("Working");
                    logGoogleUser();
                }}>SIGN IN WITH GOOGLE</Button>
            </div>

        </form>


    </div>
}

export default SignInForm