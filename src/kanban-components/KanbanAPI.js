export default class KanbanAPI {
  static insertTask(data, setData, columnId, content) {
    const newTask = {
      id: Math.floor(Math.random() * 100000),
      content,
    };
    const newData = [...data];
    newData.find((column) => column.id === columnId).items.push(newTask);
    setData(newData);
  }

  static moveTask(data, setData, taskId, newColumnId, newPosition) {
    for (const column of data) {
      const taskIndex = column.items.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        const task = column.items.splice(taskIndex, 1)[0];
        data
          .find((col) => col.id === newColumnId)
          .items.splice(newPosition, 0, task);
        break;
      }
    }
    return setData(data);
  }

  static updateTask(data, setData, taskId, newContent) {
    for (const column of data) {
      const taskIndex = column.items.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        column.items[taskIndex].content = newContent;
        break;
      }
    }
    return setData(data);
  }

  static deleteTask(data, setData, taskId) {
    for (const column of data) {
      const taskIndex = column.items.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        column.items.splice(taskIndex, 1);
        break;
      }
    }
    return setData(data);
  }
}
