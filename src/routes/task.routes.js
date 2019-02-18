const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

router.post("/", async (req, res) => {
  const { title, description, ini, end } = req.body;
  const task = new Task({
    title,
    description,
    ini,
    end
  });
  await task.save();
  res.json({
    status: "task saved"
  });
});

router.put("/:id", async (req, res) => {
  const { title, description, ini, end } = req.body;
  const newTask = { title, description, ini, end };
  await Task.findByIdAndUpdate(req.params.id, newTask);
  res.json({ status: "Task Update" });
});

router.delete("/:id", async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json({ status: "Task Delete" });
});
module.exports = router;
