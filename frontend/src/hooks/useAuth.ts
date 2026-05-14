import { getMeQuery } from "@/api/api";
import { queryKeys } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: queryKeys.AUTH.ME,
    queryFn: getMeQuery,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    isAuthenticated: !!data?.details,
  };
};
