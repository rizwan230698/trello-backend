const router = require("express").Router();
const ListModel = require("../model/list");
const uniqid = require("uniqid");

//Add new List
router.post("/", async (req, res) => {
  let createdList;
  try {
    const newList = ListModel(req.body);
    createdList = await newList.save();
  } catch (error) {
    res.status(500).json({ error: "Could not add list." });
  }

  res.json(createdList);
});

//Delete List
router.delete("/deleteList/:id", async (req, res) => {
  try {
    const query = { _id: req.params.id };
    await ListModel.deleteOne(query);
  } catch (error) {
    res.json({ error: "Could not delete list." });
  }
  res.json({ message: "List deleted successfully.", id: req.params.id });
});

//Add item to List
router.patch("/:id/addItem", async (req, res) => {
  let newItem;
  try {
    newItem = {
      id: uniqid(),
      title: req.body.title
    };
    const prev = await ListModel.findById(req.params.id);

    const updatedItem = {};
    updatedItem.title = prev.title;
    updatedItem.items = [...prev.items, newItem];

    const query = { _id: req.params.id };

    await ListModel.updateOne(query, updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Could not add item." });
  }

  res.json(newItem);
});

//Delete Item
router.delete("/:listId/deleteItem/:itemId", async (req, res) => {
  let listId;
  let itemId;
  try {
    listId = req.params.listId;
    itemId = req.params.itemId;
    await ListModel.updateOne(
      { _id: listId },
      { $pull: { items: { id: itemId } } }
    );
  } catch (error) {
    res.json({ error: "Could not delete item." });
  }
  res.json({ message: "item deleted successfully.", id: itemId });
});

//Get all List
router.get("/", async (req, res) => {
  let response;
  try {
    response = await ListModel.find({});
  } catch (error) {
    res.status(500).json({ error: "could not find lists." });
  }
  res.json(response);
});

module.exports = router;
