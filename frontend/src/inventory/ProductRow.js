import React from "react";
import { Td, Input, Button, Flex } from "@chakra-ui/react";
import DeleteButton from "./DeleteButton.js";

const ProductRow = ({
  item,
  editedItemId,
  onEditClick,
  onSaveEdit,
  onDeleteClick,
  onInputChange,
}) => {
  const cellWidth = "150px";

  return (
    <tr
      key={item._id}
      style={{
        backgroundColor:
          parseFloat(item.minimumThreshold) > parseFloat(item.quantity)
            ? "rgba(255, 0, 0, 0.1)" // Red with transparency
            : "rgba(0, 255, 0, 0.1)", // Green with transparency
      }}
    >
      <Td>
        <Flex width={cellWidth}>
          {editedItemId === item._id ? (
            <Input
              type="text"
              id={`name-${item._id}`}
              value={item.name}
              onChange={(e) => onInputChange(e, item._id, "name")}
            />
          ) : (
            item.name
          )}
        </Flex>
      </Td>
      <Td>
        <Flex width={cellWidth}>
          {editedItemId === item._id ? (
            <Input
              type="text"
              id={`quantity-${item._id}`}
              value={item.quantity}
              onChange={(e) => onInputChange(e, item._id, "quantity")}
            />
          ) : (
            item.quantity
          )}
        </Flex>
      </Td>
      <Td>
        <Flex width={cellWidth}>
          {editedItemId === item._id ? (
            <Input
              type="text"
              id={`description-${item._id}`}
              value={item.description}
              onChange={(e) => onInputChange(e, item._id, "description")}
            />
          ) : (
            item.description
          )}
        </Flex>
      </Td>
      <Td>
        <Flex width={cellWidth}>
          {editedItemId === item._id ? (
            <Input
              type="text"
              id={`minimumThreshold-${item._id}`}
              value={item.minimumThreshold}
              onChange={(e) => onInputChange(e, item._id, "minimumThreshold")}
            />
          ) : (
            item.minimumThreshold
          )}
        </Flex>
      </Td>
      <Td>
        <Flex width={cellWidth}>
          {editedItemId === item._id ? (
            <Button onClick={() => onSaveEdit(item._id)} colorScheme="teal">
              Save
            </Button>
          ) : (
            <Button onClick={() => onEditClick(item._id)} colorScheme="teal">
              Edit
            </Button>
          )}
        </Flex>
      </Td>
      <Td>
        <Flex width={cellWidth}>
          <DeleteButton onDeleteClick={onDeleteClick} itemId={item._id} />
        </Flex>
      </Td>
    </tr>
  );
};

export default ProductRow;
