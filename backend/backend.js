import express from "express";
import cors from "cors";
import inventoryServices from "./routes/inventory-services.js";

import { authenticateUser, loginUser, registerUser } from "./routes/auth.js";

import locationServices from "./routes/location-services.js";

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
        console.error(error);
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
        console.error(error);
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
      console.error(error);
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
      console.error(error);
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
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/signup", registerUser);

app.post("/login", loginUser);

// returns a list of all locations provided a user email address
app.get("/locations", async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    //const user = User.findOne({ email });
    const user = await locationServices.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Now you can access the user object and send it in the response
    const locations = await locationServices.findLocationsByUser(user);
    res.status(200).json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
