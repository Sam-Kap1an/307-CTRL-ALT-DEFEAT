// backend.js
import express from "express";
import cors from "cors";
import inventoryServices from "./routes/inventory-services.js"; // Update the path based on your actual file structure

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


//--------------------------------------------------------
// GET inventory items
// backend.js
// ...

app.get("/inventory", (req, res) => {
    const { search } = req.query;
  
    if (search) {
      inventoryServices.searchInventory(search)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.status(500).send("Internal Server Error");
        });
    } else {
      inventoryServices.getInventory()
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.status(500).send("Internal Server Error");
        });
    }
  });
  

// POST add new item to inventory
app.post("/inventory", (req, res) => {
  const itemToAdd = req.body;

  inventoryServices.addItemToInventory(itemToAdd)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

// DELETE item from inventory
app.delete("/inventory/:id", (req, res) => {
    const itemId = req.params.id;
  
    inventoryServices.deleteItemFromInventory(itemId)
      .then(() => {
        res.status(200).send("Item deleted successfully");
      })
      .catch((error) => {
        res.status(500).send("Internal Server Error");
      });
  });

// modify row
app.put("/inventory/:id", (req, res) => {
    const itemId = req.params.id;
    const updatedData = req.body;
  
    inventoryServices.updateItemInInventory(itemId, updatedData)
      .then(() => {
        res.status(200).send("Item updated successfully");
      })
      .catch((error) => {
        res.status(500).send("Internal Server Error");
      });
  });

// ----------------------------------------------------

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
