import { useAuthTokenStore } from "@/store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();


  const checkToken = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
      // window.location.href= "/sign-in"
    }
  };

  useEffect(() => {
    checkToken();
  }, [localStorage.getItem("token")]);
  return (
    <>
      Landing Page
    </>
  );
};

export default LandingPage;
