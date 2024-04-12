import React from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
    const googleSignIn = async  () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        navigate("/chat")
    };

  return (
    <div className="App">
      <NavBar />
      <main className="welcome">
        <h2>Welcome to React Chat.</h2>
        <img src="/logo512.png" alt="ReactJs logo" width={50} height={50} />
        <p>Sign in with Google to chat with with your fellow React Developers.</p>
        <button className="sign-in">
          <img
            onClick={googleSignIn}
            src={GoogleSignin}
            alt="sign in with google"
            type="button"
          />
        </button>
      </main>
    </div>

  );
};

export default Welcome;
