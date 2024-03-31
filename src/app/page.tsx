"use client";

import React, { useEffect, useState } from "react";
import SignInPage from "@/components/SignInPage";

import "./globals.css";
import axios from "axios";

import { useRouter } from "next/navigation";
import { checkUser, dbInstance, dbPromise } from "@/services/db";

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isInitilized, setIsInitilized] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    // Check Users exists after initializing the DB.
    const initialize = async () => {
      await dbInstance.open();
      if (isMounted) {
        await checkUser("muser1");
        await checkUser("muser2");
        await checkUser("muser3");
        setIsInitilized(true);
      }
    };

    if (!isInitilized) {
      initialize();
    }

    return () => {
      isMounted = false;
    };
  }, [isInitilized]);

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
