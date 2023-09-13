import { useState } from "react";
import { getTodo } from "../api";
import { Todo } from "../types";

const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodoData = async () => {
    try {
      const response = await getTodo();
      if (response.statusCode === 200) {
        setTodos(response.data);
      } else {
        console.log(response.statusCode);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { todos, fetchTodoData };
};

export default useTodo;
