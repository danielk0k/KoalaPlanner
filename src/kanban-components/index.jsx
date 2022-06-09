import React from "react";
import Navbar from "../ui-components/Navbar";
import KanbanBoard from "./KanbanBoard";

function index() {
  return (
    <Navbar>
      <KanbanBoard />
    </Navbar>
  );
}

export default index;
