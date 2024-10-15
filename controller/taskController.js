const Task = require("../models/taskModel");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate } = req.body;

    // Check if all required fields are provided
    if (!title || !description || !assignedTo || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const task = new Task({ title, description, assignedTo, dueDate });
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error. Could not create task",
        error: error.message,
      });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email");
    res.status(200).json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error. Could not fetch tasks",
        error: error.message,
      });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate } = req.body;

    // Check if all required fields are provided
    if (!title || !description || !assignedTo || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    Object.assign(task, req.body);
    await task.save();
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error. Could not update task",
        error: error.message,
      });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Use deleteOne instead of remove
    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error. Could not delete task",
        error: error.message,
      });
  }
};

// Filters tasks
exports.filterTasks = async (req, res) => {
  const { assignedTo, status, dueDate } = req.query; 
  const query = {}; 

  
  if (assignedTo) query.assignedTo = assignedTo;
  if (status) query.status = status;
  if (dueDate) query.dueDate = { $gte: new Date(dueDate) };

  try {
   
    const tasks = await Task.find(query).populate("assignedTo", "name email");
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error. Could not filter tasks",
        error: error.message,
      });
  }
};
