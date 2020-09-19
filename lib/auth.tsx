import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';
import { createUser } from './db';

interface IAuth {
  user: IFormatUser | null;
  loading: boolean;
  signInWithGitHub: (redirect?: string) => void;
  signOut: () => void;
}

interface IProvider {
  displayName: string;
  email: string;
  phoneNumber: null | string | number;
  photoURL: string;
  providerId: string;
  uid: string;
}

interface IFormatUser {
  uid: string;
  email: string;
  name: string;
  provider: string;
  // provider: IProvider;
}

const authContext = createContext<IAuth>(undefined);

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);

function useProvideAuth(): IAuth {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleUser = (rawUser) => {
    if (rawUser) {
      console.log('rawUser==>>', rawUser);
      const user = formatUser(rawUser);
      createUser(user.uid, user);
      setLoading(false);
      setUser(user);

      return user;
    } else {
      setLoading(false);
      setUser(false);

      return false;
    }
  };
  const signInWithGitHub = (redirect) => {
    setLoading(true);

    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        handleUser(response.user);
        console.log('redirect==>>', redirect);

        // if (redirect) {
        //   Router.push(redirect);
        // }
      });
  };
  const signOut = () =>
    firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signInWithGitHub,
    signOut,
  };
}

const formatUser = (user) => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  provider: user.providerData[0].providerId,
  photoURL: user.photoURL,
});
