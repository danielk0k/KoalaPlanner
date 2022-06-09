import supabaseClient from "../auth-components/supabaseClient";

export default class KanbanAPI {
  static getTasks(columnId) {
    const columnTasks = read().then((value) =>
      value.find((column) => column.id === columnId)
    );

    return columnTasks;
  }

  static insertTask(columnId, content) {
    const newTask = {
      id: Math.floor(Math.random() * 100000),
      content,
    };

    const newData = read().then((value) => {
      value.find((column) => column.id === columnId).items.push(newTask);
      return value;
    });

    newData.then((value) => save(value));
  }

  static moveTask(taskId, newColumnId, newPosition) {
    const newData = read().then((value) => {
      for (const column of value) {
        const taskIndex = column.items.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          const task = column.items.splice(taskIndex, 1)[0];
          value
            .find((col) => col.id === newColumnId)
            .items.splice(newPosition, 0, task);
          break;
        }
      }
      return value;
    });

    newData.then((value) => save(value));
  }

  static updateTask(taskId, newContent) {
    const newData = read().then((value) => {
      for (const column of value) {
        const taskIndex = column.items.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          column.items[taskIndex].content = newContent;
          break;
        }
      }
      return value;
    });

    newData.then((value) => save(value));
  }

  static deleteTask(taskId) {
    const newData = read().then((value) => {
      for (const column of value) {
        const taskIndex = column.items.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          column.items.splice(taskIndex, 1);
          break;
        }
      }
      return value;
    });

    newData.then((value) => save(value));
  }
}

async function read() {
  try {
    let { data, error, status } = await supabaseClient
      .from("profiles")
      .select("board_data")
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data.board_data.length === 0) {
      return [
        {
          id: "to_do",
          items: [],
        },
        {
          id: "in_progress",
          items: [],
        },
        {
          id: "completed",
          items: [],
        },
      ];
    } else {
      return JSON.parse(data.board_data);
    }
  } catch (error) {
    alert("Unable to retrieve board data.");
    console.log(error.error_description || error.message);
  }
}

async function save(data) {
  try {
    const user = supabaseClient.auth.user();

    const updates = {
      id: user.id,
      board_data: JSON.stringify(data),
      updated_at: new Date(),
    };

    const { error } = await supabaseClient
      .from("profiles")
      .upsert(updates, { returning: "minimal" });

    if (error) {
      throw error;
    }
  } catch (error) {
    alert("Error in updating board data.");
    console.log(error.error_description || error.message);
  }
}
