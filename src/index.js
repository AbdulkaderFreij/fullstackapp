const express = require("express");

const app = express();

let list = [{ task: "" }];

app.get("/list", (req, res) => {
  res.json(list);
});

app.get("/list/add?", (req, res) => {
  const task = req.query.task;

  let errors = [];
  if (!task) {
    errors.push({
      status: 403,
      error: true,
      message: "you cannot create a list without providing a task"
    });
  } else if (parseInt(task)) {
    errors.push({
      status: 403,
      error: true,
      message: "task should be a string"
    });
  }

  if (errors.length > 0) {
    res.json({ status: 403, error: true, message: errors });
  } else {
    list.push({ task: task });
    res.json({ task: task });
  }
});

app.listen(5000, (req, res) => console.log("server listening on port 5000..."));
