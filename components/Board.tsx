"use client";

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useEffect } from "react";
import useBoardStore from "@/store/BoardStore";
import Column from "@/components/Column";

function Board() {
  const [board, getBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
  ]);
  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;