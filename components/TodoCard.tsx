"use client";

import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { XCircleIcon } from "@heroicons/react/24/solid";
import useBoardStore from "@/store/BoardStore";
import { useEffect, useState } from "react";
import getUrl from "@/lib/getUrl";
import Image from "next/image";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({
  todo,
  index,
  id,
  innerRef,
  dragHandleProps,
  draggableProps,
}: Props) {
  const deleteTask = useBoardStore((state) => state.deleteTask);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      };
      fetchImage();
    }
  }, [todo]);

  return (
    <div
      className="bg-mainBackgroundColor p-2.5 flex flex-col items-center rounded-xl
                 hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab mb-2 shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex items-center w-full p-1">
        <p className="w-[90%]">{todo.title}</p>
        <button
          onClick={() => deleteTask(index, todo, id)}
          className="justify-end"
        >
          <XCircleIcon className="text-rose-500 ml-5 h-8 w-8 hover:text-rose-600" />
        </button>
      </div>
      {/*{Add imageUrl}*/}
      {imageUrl && (
        <div className="flex h-full w-full mt-2">
          <Image
            src={imageUrl}
            alt={"Task image"}
            width={400}
            height={200}
            className={"w-full object-contain rounded-md"}
          />
        </div>
      )}
    </div>
  );
}

export default TodoCard;
