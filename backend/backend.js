import express from "express";
import cors from "cors";
import inventoryServices from "./routes/inventory-services.js";
import userServices from "./routes/user-services.js";
import locationServices from "./routes/location-services.js";
import User from "./models/user.js";

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
