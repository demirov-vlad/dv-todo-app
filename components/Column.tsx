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
          className=""
        >
          <h2
            className="flex justify-between font-bold text-xl p-2 bg-white/50 mr-5 ml-5 rounded-2xl rounded-b-none
          shadow-sm border-b-2 border-white/30"
          >
            {idToColumnText[id]}
            <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal">
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
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`mr-5 ml-5 p-2 rounded-2xl rounded-t-none shadow-sm bg-white/50`}
              >
                <div className="">
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
                  <div className="flex items-end justify-end p-2">
                    <button
                      onClick={handleAddTodo}
                      className="text-green-500 hover:text-green-600"
                    >
                      <PlusCircleIcon className="h-10 w-10" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
