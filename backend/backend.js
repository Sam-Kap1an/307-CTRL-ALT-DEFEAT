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



app.get("/useremail", authenticateUser, (req, res) => {
  const userEmail = req.user.username;
  try {
    res.send({ userEmail });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Fetching Locations Endpoint
app.get("/location", async (req, res) => {
  try {
    const { email } = req.query;
    const user = await locationServices.findByEmail(email).populate('locations');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.locations); // Send only the locations array
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Adding Location Endpoint
app.post("/location", authenticateUser, async (req, res) => {
  const { email } = req.query;
  const locationToAdd = req.body;

  try {
    const user = await locationServices.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add location to locationServices and get the created location
    const createdLocation = await locationServices.addLocation(locationToAdd);

    // Add the created location's id to the user's locations array
    user.locations.push(createdLocation._id);
    await user.save();

    res.status(201).json(createdLocation); // Return the created location
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
