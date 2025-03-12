
import React, { useEffect, useRef } from "react";

interface GetTokenProps {
  publicKeyProp: string;
  signatureProp: string;
  type?: string;
}

const GetToken: React.FC<GetTokenProps> = ({ publicKeyProp, signatureProp,type }) => {
  const hasSignedIn = useRef(false);
 
  console.log(`type in get token ${type}`)
  async function signin() {
    try {
      const response = await fetch(`NEXT_PUBLIC_API_URLapi/${type}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicKeyProp,
          signatureProp,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem('token',data.token)
      console.log("Token Response:", data);
    } catch (error) {
      console.error("Signin error:", error);
    }
  }

  useEffect(() => {
    if (!hasSignedIn.current) {
      hasSignedIn.current = true;
      signin();
    }
  }, []); 

  return null; 
};

export default GetToken;
