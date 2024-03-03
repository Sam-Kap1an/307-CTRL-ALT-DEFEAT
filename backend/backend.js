import express from "express";
import cors from "cors";
import inventoryServices from "./routes/inventory-services.js";
import userServices from "./routes/user-services.js";
import { authenticateUser, loginUser, registerUser } from "./routes/auth.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/inventory", authenticateUser, (req, res) => {
  const { search } = req.query;
  const userEmail = req.user.username;

  if (search) {
    inventoryServices
      .searchInventory(search)
      .then((result) => {
        // Send both result and user email in the response
        res.send({ result, userEmail });
      })
      .catch((error) => {
        res.status(500).send("Internal Server Error");
      });
  } else {
    inventoryServices
      .getInventory()
      .then((result) => {
        // Send both result and user email in the response
        res.send({ result, userEmail });
      })
      .catch((error) => {
        res.status(500).send("Internal Server Error");
      });
  }
});

app.post("/inventory", authenticateUser, (req, res) => {
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

app.delete("/inventory/:id", authenticateUser, (req, res) => {
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

app.put("/inventory/:id", authenticateUser, (req, res) => {
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

app.post("/signup", registerUser);

app.post("/login", loginUser);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
