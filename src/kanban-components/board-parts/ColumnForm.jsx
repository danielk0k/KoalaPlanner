import React, { useState } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Input,
  ButtonGroup,
} from "@chakra-ui/react";

function ColumnForm({ isOpen, onOpen, onClose, newColumn }) {
  const [columnTitle, setColumnTitle] = useState("");
  const cancelRef = React.useRef();
  const handleNewColumn = (event) => {
    event.preventDefault();
    newColumn(columnTitle);
    setColumnTitle("");
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Create New Column
          </AlertDialogHeader>
          <form onSubmit={handleNewColumn}>
            <AlertDialogBody>
              <Input
                type="text"
                placeholder="Enter a title"
                maxLength="20"
                value={columnTitle}
                onChange={(event) => setColumnTitle(event.target.value)}
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <ButtonGroup spacing={4}>
                <Button colorScheme="green" type="submit">
                  Save
                </Button>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
              </ButtonGroup>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default ColumnForm;
