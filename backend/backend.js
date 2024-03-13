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

// gets inventory for a specific areaID, used to navigate from the area portal to inventory page
app.get("/inventory", authenticateUser, async (req, res) => {
  try {
    const { areaID, search } = req.query;

    let category;
    let inventory;

    if (search) {
      category = await inventoryServices.findCategoryById(areaID);
      inventory = await inventoryServices.searchInventory(search, category);
      console.log(inventory);
    } else {
      category = await inventoryServices.findCategoryById(areaID);
      inventory = await inventoryServices.findInventoryByCategory(category);
      console.log(inventory);
    }

    res.send({ inventory });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// adding inventory to a category
app.post("/inventory", authenticateUser, async (req, res) => {
  const itemToAdd = req.body;
  const { categoryID } = req.query;

  try {
    const category = await inventoryServices.findCategoryById(categoryID);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const createdInventory =
      await inventoryServices.addItemToInventory(itemToAdd);

    category.inventory.push(createdInventory._id);
    await category.save();

    res.status(201).json(createdInventory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// deletes the inventory from inventory and from the categories list given both ids (invetory as param, category as query)
app.delete("/inventory/:inventoryId", authenticateUser, (req, res) => {
  const { categoryId } = req.query;
  const inventoryId = req.params.inventoryId;

  inventoryServices
    .deleteItemFromInventory(inventoryId)
    .then(() => {
      return inventoryServices.removeInventoryFromCategory(
        categoryId,
        inventoryId,
      );
    })
    .then(() => {
      res
        .status(200)
        .send("Item deleted successfully from inventory and category");
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
    res.status(200).json(user.name);
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

    // If location is not found, return error
    if (!locationId) {
      return res
        .status(404)
        .json({ message: "Location not found for this user" });
    }

    // Remove the location from user's locations array
    user.locations = user.locations.filter(
      (location) => !location.equals(locationId),
    );

    // Save the user
    await user.save();

    // Delete the item from locations
    await locationServices.deleteItemFromLocations(locationId);

    res.status(200).send("Item deleted successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// used to navigate from the locations page to the areas page
app.get("/categories", authenticateUser, async (req, res) => {
  try {
    const { locationID } = req.query;
    console.log(locationID);

    const location = await categoryServices.findLocationById(locationID);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    const categories = await categoryServices.findCategoryByLocation(location);
    console.log(categories);
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/categories", authenticateUser, async (req, res) => {
  const categoryToAdd = req.body;
  const { locationID } = req.query;

  try {
    const location = await categoryServices.findLocationById(locationID);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    const createdCategory = await categoryServices.addCategory(categoryToAdd);

    location.categories.push(createdCategory._id);
    await location.save();

    res.status(201).json(createdCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// delete a category given its id as a param and its location id as a query
app.delete("/category/:categoryId", authenticateUser, (req, res) => {
  const categoryId = req.params.categoryId;
  const { locationId } = req.query;

  categoryServices
    .deleteCategory(categoryId)
    .then(() => {
      return categoryServices.removeCategoryFromLocation(
        locationId,
        categoryId,
      );
    })
    .then(() => {
      res
        .status(200)
        .send("Category deleted successfully from categories and location");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/category/facts/:categoryId", authenticateUser, async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await categoryServices.findCategoryById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const { totalItems, lowItems, highItems } =
      await categoryServices.countItems(category);

    res.status(200).json({ totalItems, lowItems, highItems });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
