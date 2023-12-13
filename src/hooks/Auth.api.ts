import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import { auth } from "@/config/firebase";

export const handleAuthentication = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const response = await signInWithPopup(auth, provider);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
};
