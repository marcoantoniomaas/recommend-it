import { useQuery } from "@tanstack/react-query";

import { categoriesService } from "@/services/recommendations";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoriesService.list,
    staleTime: 1000 * 60 * 10,
  });
}
