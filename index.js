const { program } = require("commander");

const {
  getAll,
  getById,
  createTask,
  removeTask,
  updateTask,
} = require("./handlers/handle");

program
  .name("myCli")
  .description("A simple CLI to manage your tasks")
  .version("1.0.0");
program
  .option("--method <method>", "Action to perform")
  .option("--id <id>", "Task id")
  .option("--title <title>", "Task title")
  .option("--completed <completed>", "Task completion status");
  
program.parse(process.argv);

const { method, id, title, completed } = program.opts();
console.log(method, id, title, completed);

(async () => {
  if (method === "list") {
    const result = await getAll();
    console.log("====================================");
    console.log(result);
    console.log("====================================");
  }
  if (method === "get") {
    const result = await getById(id);
    if (!result) {
      throw new Error(`Task by id=${id} not found`);
    }
    console.log("====================================");
    console.log(result);
    console.log("====================================");
  }
  if (method === "create") {
    const result = await createTask(title, completed);
    console.log("====================================");
    console.log(result);
    console.log("====================================");
  }
  if (method === "update") {
    const result = await updateTask(id, title, completed);
    console.log("====================================");
    console.log(result);
    console.log("====================================");

    const tasks = await getAll();
    console.table(tasks);
  }
  if (method === "remove") {
    const result = await removeTask(id);
    console.log("====================================");
    console.log(result);
    console.log("====================================");
  }
})();
