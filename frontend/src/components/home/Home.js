import React from "react";
import { Text, Flex, Button, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div width="500px" style={{ backgroundColor: "#EFD9D1" }}>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={5}
        padding={5}
        height="100vh"
      >
        <div>
          <Text fontSize="90px" fontWeight="bold" letterSpacing="20px">
            <span style={{ color: "#D47697" }}>SOR</span>
            <span style={{ color: "#6e3652" }}>TIFY</span>
          </Text>
        </div>
        <div>
          <Text
            fontSize="24px"
            fontWeight="bold"
            color="#darkBlue"
            textAlign="center"
            width="800px"
          >
            Sortify is for people who often find themselves forgetting what they
            have and don’t have around the property (house, business, classroom,
            etc.). This is an inventory app that helps users track what items
            they have for specific areas (kitchen, garage, backyard, office).
            Unlike methods like tracking on a notes app or using paper and
            pencil our product provides an efficient and concise way to track
            and see item stocks grouped based on their areas of use.
          </Text>
        </div>
        <Button
          backgroundColor="darkBlue"
          color="white"
          width="200px"
          height="50px"
          onClick={handleStartClick}
        >
          Get Started Today!
        </Button>
        <Link onClick={handleLoginClick}>
          <Text>Already have an account? Log In</Text>
        </Link>
      </Flex>
    </div>
  );
};

export default Home;
