export default class KanbanAPI {
  static insertTask(data, setData, columnId, content) {
    const newTask = {
      id: Math.floor(Math.random() * 100000),
      content,
    };
    const newData = [...data];
    newData.find((column) => column.id === columnId).items.push(newTask);
    setData(newData);
    return newData;
  }

  static moveTask(data, setData, destination, source) {
    const newData = [...data];
    const srcColIndex = newData.findIndex(
      (column) => column.id === source.droppableId
    );
    const destColIndex = newData.findIndex(
      (column) => column.id === destination.droppableId
    );
    const task = newData[srcColIndex].items.splice(source.index, 1)[0];
    newData[destColIndex].items.splice(destination.index, 0, task);
    setData(newData);
    return newData;
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
