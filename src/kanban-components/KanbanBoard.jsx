import { Link } from "react-router-dom";
import styles from "./main.css";

function KanbanBoard() {
  return (
    <body className={{ styles }}>
      <h1>Board</h1>
      <Link to="/app/profile">Profile | </Link>
      <Link to="/app/board">Board | </Link>
      <Link to="/app/settings">Settings</Link>
      <div class="kanban">
        <div class="kanban__column">
          <div class="kanban__column-title">Not Started</div>
          <div class="kanban__column-items">
            <div contenteditable class="kanban__item-input">
              Wash the dishes
            </div>
            <div class="kanban__dropzone"></div>
          </div>
          <button class="kanban__add-item" type="button">
            + Add
          </button>
        </div>
      </div>
      <script type="module" src="js/main.js" type="module"></script>
    </body>
  );
}

export default KanbanBoard;
