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
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import {
	toastErrorNotify,
	toastSuccessNotify,
	toastWarnNotify,
} from "../helpers/ToastNotify";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(false);
	let navigate = useNavigate();

	useEffect(() => {
		userObserver();
	}, []);

	const createUser = async (email, password, displayName) => {
		try {
			let userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			//? kullanıcı profilini güncellemek için kullanılan firebase metodu
			await updateProfile(auth.currentUser, {
				displayName,
			});

			navigate("/");
			toastSuccessNotify("Registered successfully!");
		} catch (error) {
			toastErrorNotify(error.message);
		}
	};

	const signIn = async (email, password) => {
		try {
			//? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
			let userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			navigate("/");
			toastSuccessNotify("Logged in successfully!");
			console.log(userCredential);
		} catch (error) {
			toastErrorNotify(error.message);
		}
	};

	const logOut = () => {
		signOut(auth);
		toastSuccessNotify("Logged out successfully!");
	};

	const userObserver = () => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const { email, displayName, photoURL } = user;
				setCurrentUser({ email, displayName, photoURL });
				console.log(user);
			} else {
				setCurrentUser(false);
				console.log("logged out");
			}
		});
	};

	//* => Authentication => settings => Authorized domains => add domain

	const signUpProvider = () => {
		const provider = new GoogleAuthProvider();

		signInWithPopup(auth, provider)
			.then((result) => {
				console.log(result);
				navigate("/");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const forgotPassword = (email) => {
		sendPasswordResetEmail(auth, email)
			.then(() => {
				toastWarnNotify("Please check your mail box!");
			})
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
