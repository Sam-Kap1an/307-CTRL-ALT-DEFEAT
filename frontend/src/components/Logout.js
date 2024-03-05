import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate(); // Move it here, outside the function

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <Button
      backgroundColor="darkBlue"
      color="white"
      variant="outline"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
