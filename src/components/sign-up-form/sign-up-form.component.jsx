import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";

// Effectively a model for the form where we're creating a user's credentials.
const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
}


const SignUpForm = (props) => {

    // Access the formFields and setForFields from the state we're creating with the model above.
    const [formFields, setFormFields] = useState(defaultFormFields);

    // Destructure all of the properties from the model.
    const { displayName, email, password, confirmPassword } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Do passwords match?
        if (password !== confirmPassword) {
            alert("Passwords must match.");
            return;
        }

        // Is password longer than 6 characters?
        if (password.length < 6) {
            alert("Password must be 6 characters or more.");
            return;
        }

        // Confirm password
        try {
            const response = await createAuthUserWithEmailAndPassword(email, password, displayName);
            const { user } = response;
            const userDocRef = await createUserDocumentFromAuth({ ...user, displayName });
            console.log(userDocRef);
        } catch (error) {
            // Does user already exist?
            if (error.code === "auth/email-already-in-use") alert("User already exists.");
            else console.log(error);
        }

    }



    // Method is triggered whenever the onChange handler changes a property within the models.
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div >
            <h1>Don't have an account?</h1>
            <h2>Sign up with your email and password</h2>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

                <Button type="submit">Sign up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;