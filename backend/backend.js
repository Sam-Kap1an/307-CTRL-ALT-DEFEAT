import express from "express";
import cors from "cors";
import inventoryServices from "./routes/inventory-services.js";
import userServices from "./routes/user-services.js";
import locationServices from "./routes/location-services.js";
import categoryServices from "./routes/category-services.js";
import { authenticateUser, loginUser, registerUser } from "./routes/auth.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send("Successfully connected");
});

app.get("/:id/inventory", async (req, res) => {
  try {
    const { search } = req.query;
    const { id } = req.params;

    let category;
    let inventory;

    if (search) {
      category = await inventoryServices.findCategoryById(id);
      inventory = await inventoryServices.searchInventory(search, category);
      console.log(inventory);
    } else {
      category = await inventoryServices.findCategoryById(id);
      inventory = await inventoryServices.findInventoryByCategory(category);
      console.log(inventory);
    }

    res.send({ inventory });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
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
app.get("/location", authenticateUser, async (req, res) => {
  const userEmail = req.user.username;
  try {
    //const user = User.findOne({ email });
    const user = await userServices.findUserByEmail(userEmail);
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

app.get("/username", authenticateUser, async (req, res) => {
  const username = req.user.username;
  try {
    //const user = User.findOne({ email });
    const user = await userServices.findUserByEmail(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Now you can access the user object and send it in the response
    res.status(200).json(username);
  } catch (error) {
    console.error("Error fetching username:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/location", authenticateUser, async (req, res) => {
  const locationToAdd = req.body;
  const userEmail = req.user.username;
  try {
    const user = await locationServices.findByEmail(userEmail);
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

app.delete("/location/:locationId", authenticateUser, async (req, res) => {
  const { locationId } = req.params;
  const userEmail = req.user.username;
  try {
    const user = await userServices.findUserByEmail(userEmail);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Convert locationId to ObjectId
    // Filter out the location with matching _id

    // Convert locationId to ObjectId
    const LocationTBD = categoryServices.findLocationById(locationId);

    // Filter out the location with matching _id
    user.locations = user.locations.filter(location => !location.equals(LocationTBD._id));

    // Save the user
    await user.save();

    // Delete the item from locations
    await locationServices.deleteItemFromLocations(LocationTBD._id);

    res.status(200).send("Item deleted successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


app.get("/:id/categories", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const location = await categoryServices.findLocationById(id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    const categories = await categoryServices.findCategoryByLocation(location);
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
