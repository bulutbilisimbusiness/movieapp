import React, { createContext } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router";
export const AuthContext = createContext();

//* with custom hook
/* export const useAuthContext = () =>{
    return useContext(AuthContext)
} */

const AuthContextProvider = ({ children }) => {
    let navigate=useNavigate()
	const createUser = async (email, password) => {
		try {
			let userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log(userCredential);
            navigate('/')
		} catch (error) {
			console.log(error.message);
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
            navigate('/')
		} catch (error) {
			console.log(error.message);
		}
	};
	const values = { createUser, signIn };
	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
