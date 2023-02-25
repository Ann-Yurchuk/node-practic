const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const tasksPath = path.resolve(__dirname, "..", "db", "tasks.json");

const getAll = async () => {
  try {
    const rawData = await fs.readFile(tasksPath, "utf-8");
    return JSON.parse(rawData);
  } catch (err) {
    console.log("====================================");
    console.log(err.message);
    console.log("====================================");
  }
};

const getById = async (id) => {
  try {
    const tasks = await getAll();
    return tasks.find((task) => String(task.id) === String(id));
  } catch (err) {
    console.log("====================================");
    console.log(err.message);
    console.log("====================================");
  }
};

const createTask = async (title, completed) => {
  try {
    const id = crypto.randomUUID();
    const tasks = await getAll();
    const newTasks = { id, title, completed };
    tasks.push(newTasks);
    await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 4));
    return newTasks;
  } catch (err) {
    console.log("====================================");
    console.log(err.message);
    console.log("====================================");
  }
};

const removeTask = async (id) => {
  try {
    const tasks = await getAll();
    const newTasksList = tasks.filter((task) => String(task.id) !== String(id));
    await fs.writeFile(tasksPath, JSON.stringify(newTasksList, null, 4));
  } catch (err) {
    console.log("====================================");
    console.log(err.message);
    console.log("====================================");
  }
};

const updateTask = async (id, title, completed) => {
  try {
    const tasks = await getAll();
    if (title) {
      tasks.find((task) => String(task.id) === String(id)).title = title;
    }
    if (completed) {
      tasks.find((task) => String(task.id) === String(id)).completed = completed;
    }

    await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 4));

  } catch (err) {
    console.log("====================================");
    console.log(err.message);
    console.log("====================================");
  }
};

module.exports = {
  getAll,
  getById,
  createTask,
  removeTask,
  updateTask,
};
