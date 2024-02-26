import express from "express";
import cors from "cors";
import inventoryServices from "./routes/inventory-services.js";
import userServices from "./routes/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/inventory", (req, res) => {
  const { search } = req.query;

  if (search) {
    inventoryServices
      .searchInventory(search)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send("Internal Server Error");
      });
  } else {
    inventoryServices
      .getInventory()
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send("Internal Server Error");
      });
  }
});

app.post("/inventory", (req, res) => {
  const itemToAdd = req.body;

  inventoryServices
    .addItemToInventory(itemToAdd)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

app.delete("/inventory/:id", (req, res) => {
  const itemId = req.params.id;

  inventoryServices
    .deleteItemFromInventory(itemId)
    .then(() => {
      res.status(200).send("Item deleted successfully");
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

app.put("/inventory/:id", (req, res) => {
  const itemId = req.params.id;
  const updatedData = req.body;

  inventoryServices
    .updateItemInInventory(itemId, updatedData)
    .then(() => {
      res.status(200).send("Item updated successfully");
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

app.post("/signup", (req, res) => {
  const userToAdd = req.body;

  userServices
    .addNewUser(userToAdd)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
