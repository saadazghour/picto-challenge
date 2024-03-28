"use client";

import React, { useEffect, useState } from "react";
import SignInPage from "@/components/SignInPage";

import "./globals.css";
import axios from "axios";

import { useRouter } from "next/navigation";
import { checkUser, dbInstance, dbPromise } from "@/services/db";

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Use this function to check Users exists after initializing the DB.

    dbPromise.then(() => {
      checkUser("muser1");
      checkUser("muser2");
      checkUser("muser3");
    });

    dbInstance.open();
  }, []);

  const handleSignIn = async (username: string, password: string) => {
    console.log("Attempting to sign in with:", username, password);

    try {
      const res = await axios.post(`/api/auth/signin`, {
        username,
        password,
      });

      // Assuming the response includes a success
      if (res.data.message === "Authentication successful") {
        setIsSignedIn(true);
        setTimeout(() => {
          router.push("/main");
        }, 1000); // Delay of 1000 milliseconds (1 second)
        setErrorMessage("Authentication successful");
      } else {
        // Handle error
        setErrorMessage(res.data.message);
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data.message || "An error occurred during sign-in."
      );
    }
  };

  return !isSignedIn ? (
    <SignInPage error={errorMessage} onSignIn={handleSignIn} />
  ) : null;
}
