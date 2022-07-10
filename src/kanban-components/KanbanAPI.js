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

  static insertNewColumn(data, setData, columnId) {
    const newData = [...data];
    newData.push({
      id: columnId,
      items: [],
    });
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

  static moveColumn(data, setData, destination, source) {
    const newData = [...data];
    const column = newData.splice(source.index, 1)[0];
    newData.splice(destination.index, 0, column);
    setData(newData);
    return newData;
  }

  static updateTask(data, setData, taskId, newContent) {
    const newData = [...data];
    for (const column of newData) {
      const taskIndex = column.items.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        column.items[taskIndex].content = newContent;
        break;
      }
    }
    setData(newData);
    return newData;
  }

  static completedTask(data, setData, taskId) {
    const newData = [...data];
    for (const column of newData) {
      const taskIndex = column.items.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        column.items[taskIndex].content.completed_on = new Date().toISOString();
        newData[0].items.push(column.items.splice(taskIndex, 1)[0]);
        break;
      }
    }
    setData(newData);
    return newData;
  }

  static deleteTask(data, setData, taskId) {
    const newData = [...data];
    for (const column of newData) {
      const taskIndex = column.items.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        column.items.splice(taskIndex, 1);
        break;
      }
    }
    setData(newData);
    return newData;
  }

  static deleteColumn(data, setData, columnId) {
    const newData = [...data];
    const colIndex = newData.findIndex((column) => column.id === columnId);
    if (colIndex !== -1) {
      newData.splice(colIndex, 1);
    }
    setData(newData);
    return newData;
  }
}
