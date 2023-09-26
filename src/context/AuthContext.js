import React, { createContext, useEffect, useState } from "react";
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";
import { toastErrorNotify, toastSuccessNotify, toastWarnNotify } from "../helpers/ToastNotify";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

//* with custom hook
/* export const useAuthContext = () =>{
    return useContext(AuthContext)
} */

const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(false);
	let navigate = useNavigate();
	useEffect(()=>{
		userObserver();
	},[])
	const createUser = async (email, password,displayName) => {
		try {
			let userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			await updateProfile(auth.currentUser,{
				displayName,
			})
			console.log(userCredential);
			navigate("/");
			toastSuccessNotify("Registered succesfully!");
		} catch (error) {
			toastErrorNotify(error.message);
		}
	};
	const signIn = async (email, password) => {
		try {
			let userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log(userCredential);
			navigate("/");
			toastSuccessNotify("Logged in succesfully!");
		} catch (error) {
			toastErrorNotify(error.message);
		}
	};
	const logOut = () => {
		signOut(auth);
		toastSuccessNotify("Logged out sucessfully!");
	};
	const userObserver = () => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const { email, displayName, photoURL } = user;
				setCurrentUser({ email, displayName, photoURL });
			} else {
				setCurrentUser(false)
				console.log("logged out");
			}
		});
	};
	const signUpProvider =() =>{
		const provider=new GoogleAuthProvider()
		signInWithPopup(auth,provider)
		.then((result)=>{
			console.log(result)
			navigate('/')
	}).catch((error)=>{
		console.log(error)
	});
}
const forgotPassword = (email) => {
    //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
    sendPasswordResetEmail(auth, email)
      .then(() => { 
        toastWarnNotify("Please check your mail box!")})
      .catch((err) => {
        toastErrorNotify(err.message);
      });
  };

  const values = {
    createUser,
    signIn,
    logOut,
    currentUser,
    signUpProvider,
    forgotPassword,
  };
	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
