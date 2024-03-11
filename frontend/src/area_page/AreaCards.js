import React from "react";
import {
  Card,
  CardBody,
  Text,
  CardFooter,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
  Portal,
  Flex,
} from "@chakra-ui/react";

const AreaCards = ({
  name,
  id,
  lowItems,
  highItems,
  totalItems,
  details,
  onClick,
  onDelete,
}) => {
  return (
    <Card
      direction="column"
      justify="center"
      height="213.75px"
      width="213.75px"
      backgroundColor="#F0D9CF"
      position="relative"
    >
      <Button
        onClick={onDelete}
        size="sm"
        position="absolute"
        top="2"
        right="2"
        variant="outline"
        borderColor="white"
      >
        🗑️
      </Button>
      <CardBody overflow="scroll" height="150px">
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          onClick={onClick}
          cursor="pointer"
        >
          <Text fontSize="20px" fontWeight="bold" color="#6e3652">
            {name}
          </Text>
          <Text fontSize="16px" color="#6e3652">
            {details}
          </Text>
        </Flex>
      </CardBody>
      <CardFooter direction="column" justifyContent="center">
        <Popover>
          <PopoverTrigger display="flex" justifyContent="center">
            <Button backgroundColor="darkBlue" color="white">
              Quick Facts
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverCloseButton />
              <PopoverBody>
                <Text>Total Items: {totalItems}</Text>
                <Text>Low Quantity Items: {lowItems}</Text>
                <Text>High Quantity Items: {highItems}</Text>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </CardFooter>
    </Card>
  );
};

export default AreaCards;
