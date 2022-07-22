import KanbanAPI from "../kanban-components/KanbanAPI";

// Set dummy data
var data = [
  {
    id: "completed",
    items: [],
  },
];

test("1: Insert new column", () => {
  data = KanbanAPI.insertNewColumn(data, jest.fn, "New Column");
  expect(data[1].id === "New Column").toBeTruthy();
});

test("2: Insert new task", () => {
  const content = {
    title: "New Task",
    description: "Some Description",
    due_date: new Date(),
    color: "#000000",
    completed_on: "",
  };
  data = KanbanAPI.insertTask(data, jest.fn, "New Column", content);
  expect(data[1].items.length === 1).toBeTruthy();
});

test("3: Complete a task", () => {
  const taskId = data[1].items[0].id;
  data = KanbanAPI.completedTask(data, jest.fn, taskId);
  expect(data[0].items.length === 1).toBeTruthy();
});

test("4: Move a task", () => {
  const destination = {
    droppableId: "New Column",
    index: 0,
  };
  const source = {
    droppableId: "completed",
    index: 0,
  };
  data = KanbanAPI.moveTask(data, jest.fn, destination, source);
  expect(data[1].items.length === 1).toBeTruthy();
});

test("5: Update a task", () => {
  const taskId = data[1].items[0].id;
  const newContent = {
    title: "New Task",
    description: "Some Description",
    due_date: new Date(),
    color: "#FFFFFF",
    completed_on: "",
  };
  data = KanbanAPI.updateTask(data, jest.fn, taskId, newContent);
  expect(
    data[1].items.length === 1 && data[1].items[0].content.color === "#FFFFFF"
  ).toBeTruthy();
});

test("6: Delete a task", () => {
  const taskId = data[1].items[0].id;
  data = KanbanAPI.deleteTask(data, jest.fn, taskId);
  expect(data[1].items.length === 0).toBeTruthy();
});

test("7: Move a column", () => {
  data = KanbanAPI.insertNewColumn(data, jest.fn, "Another Column");
  const destination = {
    index: 1,
  };
  const source = {
    index: 2,
  };
  data = KanbanAPI.moveColumn(data, jest.fn, destination, source);
  expect(data[1].id === "Another Column").toBeTruthy();
});

test("8: Delete a column", () => {
  const length_before = data.length;
  data = KanbanAPI.deleteColumn(data, jest.fn, "Another Column");
  expect(
    data.length === length_before - 1 && data[1].id === "New Column"
  ).toBeTruthy();
});
