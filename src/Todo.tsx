import React, { useState } from "react";
import { Todo } from "./types";

interface Props {
  todo: Todo;
  onDelete: (id: number) => void;
  onUpdate: (id: number, completed: boolean, newTitle: string) => void;
  onToggle: (todo: Todo) => void;
}

const Todo = ({ todo, onDelete, onUpdate, onToggle }: Props) => {
  const [newTitle, setNewTitle] = useState<string>(todo.title);
  const [editing, setEditing] = useState<boolean>(false);

  const handleClickDelete = () => {
    onDelete(todo.id);
  };

  const handleClickUpdate = () => {
    if (editing) {
      onUpdate(todo.id, todo.completed, newTitle);
      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  const handleChangeNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleChangeToggle = () => {
    onToggle(todo);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleChangeToggle}
      />
      {editing ? (
        <input type="text" value={newTitle} onChange={handleChangeNewTitle} />
      ) : (
        <>{todo.title}</>
      )}

      <button type="button" onClick={handleClickUpdate}>
        {editing ? "저장" : "수정"}
      </button>
      <button type="button" onClick={handleClickDelete}>
        삭제
      </button>
    </li>
  );
};

export default Todo;
