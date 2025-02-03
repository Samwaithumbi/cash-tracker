import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 

const Google = () => {
    const [value, setValue] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((data) => {
            console.log(data);
            setValue(data.user.email);
            localStorage.setItem("email", data.user.email);
            navigate("/dashboard"); // Redirect to Dashboard
            console.log(value);
        }).catch((error) => {
            console.error("Error signing in with Google: ", error);
        });
    };

    useEffect(() => {
        setValue(localStorage.getItem("email"));
    }, []);

    return ( 
        <div>
            <img 
                src="/signinwithgoogle.png"
                style={{ cursor: "pointer" }}
                width="130px"
                alt="google"
                onClick={googleLogin}
            />
        </div>
    );
};

export default Google;
