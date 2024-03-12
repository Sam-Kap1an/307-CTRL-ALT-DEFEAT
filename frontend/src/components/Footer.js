import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      as="footer"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="white"
      color="#6e3652"
      position="fixed"
      bottom="0"
      width="1000px"
    >
      <Text fontSize="lg" mx="auto">
        © 2024 SORTIFY | All Rights Reserved
      </Text>
    </Flex>
  );
};

export default Footer;
