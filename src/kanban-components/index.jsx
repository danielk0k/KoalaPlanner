import React from "react";
import Navbar from "../ui-components/Navbar";
import KanbanAPI from "./KanbanAPI.js";
import { Heading } from "@chakra-ui/react";

function index() {
  KanbanAPI.deleteTask(86975);
  return (
    <Navbar>
      <Heading>Board</Heading>
    </Navbar>
  );
}

export default index;
