import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const useFirebase = () => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;

      setUser(user);

      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        handle: user.email?.split("@")[0],
        id: user.uid,
        updatedAt: serverTimestamp(),
      });
    });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return {
    handleSignInWithGoogle,
    user,
    handleSignOut,
  };
};

export default useFirebase;
