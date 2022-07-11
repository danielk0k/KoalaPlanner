import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

function TableView({ tasks, type }) {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th isNumeric>{type === "completed" ? "Completed" : "Due"} Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map((task, index) => (
            <Tr key={task.id}>
              <Td>{index + 1}</Td>
              <Td>{task.content.title}</Td>
              <Td>{task.content.description}</Td>
              <Td isNumeric>
                {new Date(
                  type === "completed"
                    ? task.content.completed_on
                    : task.content.due_date
                ).toDateString()}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TableView;
