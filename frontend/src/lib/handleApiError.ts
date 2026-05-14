import type { ApiResponse } from "@/api/types";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const handleApiError = <T, V>(
  err: T,
  defaultErrMsg = "Something went wrong",
) => {
  let message;
  if (axios.isAxiosError(err)) {
    const error = err as AxiosError<ApiResponse<V>>;
    message = error.response?.data.message ?? defaultErrMsg;
    toast.error(message);
  } else {
    toast.error(defaultErrMsg);
  }
};
