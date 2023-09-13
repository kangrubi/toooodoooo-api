import React, { useEffect, useMemo, useState } from "react";
import useTodo from "./hooks/useTodo";
import Todo from "./Todo";
import { deleteTodo, postTodo, putTodo } from "./api";
import { Todo as TodoType } from "./types";

const App = () => {
  const { todos, fetchTodoData } = useTodo();
  const [title, setTitle] = useState<string>("");
  const sortedTodo = useMemo(() => {
    return [...todos].sort((a, b) => a.id - b.id);
  }, [todos]);

  useEffect(() => {
    fetchTodoData();
  }, []);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAdd = async () => {
    await postTodo({
      title: title,
    });

    fetchTodoData();
  };

  const handleDelete = async (id: number) => {
    await deleteTodo({
      id: id,
    });

    fetchTodoData();
  };

  const handleUpdate = async (
    id: number,
    completed: boolean,
    newTitle: string
  ) => {
    await putTodo({
      id: id,
      title: newTitle,
      completed: completed,
    });

    fetchTodoData();
  };

  const handleToggle = async (todo: TodoType) => {
    await putTodo({
      id: todo.id,
      title: todo.title,
      completed: !todo.completed,
    });

    fetchTodoData();
  };

  return (
    <>
      <ul>
        {sortedTodo.map((todo) => (
          <Todo
            key={JSON.stringify(todo)}
            todo={todo}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onToggle={handleToggle}
          />
        ))}
      </ul>
      <>
        <input type="text" value={title} onChange={handleChangeTitle} />
        <button type="button" onClick={handleAdd}>
          추가
        </button>
      </>
    </>
  );
};

export default App;
