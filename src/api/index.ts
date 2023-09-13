import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_URL,
});

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

interface TodoData {
  id: number;
  title: string;
  completed: boolean;
}

interface PostTodoParams {
  title: string;
}

interface DeleteTodoParams {
  id: number;
}

interface PutTodoParams {
  id: number;
  title: string;
  completed: boolean;
}

export const getTodo = async () => {
  const { data } = await axiosInstance.get<ApiResponse<TodoData[]>>("/todo");
  return data;
};

export const postTodo = async ({ title }: PostTodoParams) => {
  const { data } = await axiosInstance.post<ApiResponse<TodoData>>("/todo", {
    title,
  });
  return data;
};

export const deleteTodo = async ({ id }: DeleteTodoParams) => {
  const { data } = await axiosInstance.delete<ApiResponse<undefined>>(
    `/todo/${id}`
  );
  return data;
};

export const putTodo = async ({ id, title, completed }: PutTodoParams) => {
  const { data } = await axiosInstance.put<ApiResponse<TodoData>>(
    `/todo/${id}`,
    { title, completed }
  );
  return data;
};
