"use client";

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useEffect } from "react";
import useBoardStore from "@/store/BoardStore";
import Column from "@/components/Column";

function Board() {
  const [board, getBoard, setBoardState, updateTodosInDB] = useBoardStore(
    (state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updateTodoInDB,
    ],
  );
  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    // Check if user dragged card outside of board
    if (!destination) return;
    // Handle a column drag
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({
        ...board,
        columns: rearrangedColumns,
      });
    } else {
      // This step is needed as the indexes are stored as numbers 0,1,2 etc. instead of id's with DND Library
      const columns = Array.from(board.columns);
      const startColIndex = columns[Number(source.droppableId)];
      const finishColIndex = columns[Number(destination.droppableId)];

      const startCol: Column = {
        id: startColIndex[0],
        todos: startColIndex[1].todos,
      };

      const finishCol: Column = {
        id: finishColIndex[0],
        todos: finishColIndex[1].todos,
      };

      if (!startCol || !finishCol) return;

      if (source.index === destination.index && startCol === finishCol) return;

      const newTodos = startCol.todos;
      const [todoMoved] = newTodos.splice(source.index, 1);

      if (startCol.id === finishCol.id) {
        //Same column task drag
        newTodos.splice(destination.index, 0, todoMoved);
        const newCol = {
          id: startCol.id,
          todos: newTodos,
        };
        const newColumns = new Map(board.columns);
        newColumns.set(startCol.id, newCol);
        setBoardState({ ...board, columns: newColumns });
      } else {
        //dragging to additional column
        const finishTodos = Array.from(finishCol.todos);
        finishTodos.splice(destination.index, 0, todoMoved);
        const newColumns = new Map(board.columns);
        const newCol = {
          id: startCol.id,
          todos: newTodos,
        };

        newColumns.set(startCol.id, newCol);
        newColumns.set(finishCol.id, {
          id: finishCol.id,
          todos: finishTodos,
        });

        // Update in DB
        updateTodosInDB(todoMoved, finishCol.id);

        setBoardState({ ...board, columns: newColumns });
      }
    }
  };

  return (
    <div className="m-auto flex px-[40px]">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <div className="mx-auto flex">
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex"
              >
                {Array.from(board.columns.entries()).map(
                  ([id, column], index) => (
                    <Column
                      key={id}
                      id={id}
                      todos={column.todos}
                      index={index}
                    />
                  ),
                )}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Board;
