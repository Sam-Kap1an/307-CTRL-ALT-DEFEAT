// ProductTable.js
import React from "react";
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import ProductRow from "./ProductRow.js";

const ProductTable = ({
  filteredInventory,
  editedItemId,
  handleEditClick,
  handleSaveEdit,
  handleDeleteClick,
  handleInputChange,
}) => (
  <Table>
    <Thead>
      <Tr>
        <Th>Product</Th>
        <Th>Quantity</Th>
        <Th>Description</Th>
        <Th>Minimum Threshold</Th>
        <Th>Edit</Th>
        <Th>Delete</Th>
      </Tr>
    </Thead>
    <Tbody>
      {filteredInventory.map((item) => (
        <ProductRow
          key={item._id}
          item={item}
          editedItemId={editedItemId}
          onEditClick={handleEditClick}
          onSaveEdit={handleSaveEdit}
          onDeleteClick={handleDeleteClick}
          onInputChange={handleInputChange}
        />
      ))}
    </Tbody>
  </Table>
);

export default ProductTable;
