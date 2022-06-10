import TaskCard from "./TaskCard";

function TaskList({ data, columnId }) {
  const column = data.find((col) => col.id === columnId);
  return column.items.map((task) => <TaskCard task={task} />);
}

export default TaskList;
