// ProductRow.js
import React from "react";
import { Td, Input, Button } from "@chakra-ui/react";
import DeleteButton from "./DeleteButton.js";

const ProductRow = ({
  item,
  editedItemId,
  onEditClick,
  onSaveEdit,
  onDeleteClick,
  onInputChange,
}) => {
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
      </Td>
      <Td>
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
      </Td>
      <Td>
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
      </Td>
      <Td>
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
      </Td>
      <Td>
        {editedItemId === item._id ? (
          <Button onClick={() => onSaveEdit(item._id)} colorScheme="teal">
            Save
          </Button>
        ) : (
          <Button onClick={() => onEditClick(item._id)} colorScheme="teal">
            Edit
          </Button>
        )}
      </Td>
      <Td>
        <DeleteButton onDeleteClick={onDeleteClick} itemId={item._id} />
      </Td>
    </tr>
  );
};

export default ProductRow;
