import { Draggable, Droppable } from "react-beautiful-dnd";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import TodoCard from "@/components/TodoCard";
import useBoardStore from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "To Do",
  inprogress: " In Progress",
  done: "Done",
};

function Column({ id, todos, index }: Props) {
  const [searchString, setNewTaskType] = useBoardStore((state) => [
    state.searchString,
    state.setNewTaskType,
  ]);
  const openModal = useModalStore((state) => state.openModal);
  const handleAddTodo = () => {
    setNewTaskType(id);
    openModal();
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="w-[300px] h-fit rounded-md
                      flexflex-col ml-2 mr-2 overflow-x-scroll"
        >
          <h2 className="bg-columnBackgroundColor rounded-t-md flex justify-between font-bold text-xl p-2">
            {idToColumnText[id]}
            <span className="text-white bg-sky-500 rounded-full h-7 w-7 px-1 py-1 text-sm text-center font-normal">
              {!searchString
                ? todos.length
                : todos.filter((todo) =>
                    todo.title
                      .toLowerCase()
                      .includes(searchString.toLowerCase()),
                  ).length}
            </span>
          </h2>
          {/*  render droppable todos in the column*/}
          <div
            className="bg-columnBackgroundColor rounded-b-md flex flex-grow flex-col gap-2 p-2
                            overflow-x-hidden shadow-md"
          >
            <Droppable droppableId={index.toString()} type="card">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {todos.map((todo, index) => {
                    if (
                      searchString &&
                      !todo.title
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                    )
                      return null;
                    return (
                      <Draggable
                        key={todo.$id}
                        draggableId={todo.$id}
                        index={index}
                      >
                        {(provided) => (
                          <TodoCard
                            todo={todo}
                            index={index}
                            id={id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  <button
                    onClick={handleAddTodo}
                    className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4
                      border-x-columnBackgroundColor hover:text-rose-500 active:text-rose-800"
                  >
                    <PlusCircleIcon className="h-10 w-10" />
                  </button>
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
