const express = require("express");
const router = express.Router();
const {
  saveFavorite,
  getAllFavorites,
  updateFavorite,
  deleteFavorite,
} = require("../controllers/Favorite");

try {
} catch (err) {}

// Create a new favorite
router.post("/", async (req, res) => {
  try {
    const favorite = req.body;
    const newFav = await saveFavorite(favorite);
    res.status(201).json({ message: "Favorite created", data: newFav });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Read all favorites
router.get("/", async (req, res) => {
  try {
    let favorites = await getAllFavorites();
    res.status(201).json({ data: favorites });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Update a favorite by ID
router.patch("/:id",async (req, res) => {
  try {
    let favoriteId = reg.params;
    let newData = req.body;
    let updatedFavorite = await updateFavorite(favoriteId,newData)
    res.status(201).json({ data: updatedFavorite, message: "Favorite updated" })
  } catch{
    res.status(404).json({ message: "Favorite not found" });
  }
});

// Delete a favorite by ID
router.delete("/:id", async (req, res) => {
  try {
    let favoriteId = req.params;
    let deleteData = await deleteFavorite(favoriteId);
    res.status(201).json({ data: deleteData, message: "Favorite deleted" })
  } catch (err) {
    res.status(404).json({ message: "Favorite not found" });
  }
});

module.exports = router;
