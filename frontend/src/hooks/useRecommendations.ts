import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  recommendationsService,
  type RecommendationQuery,
} from "@/services/recommendations";
import type { RecommendationPayload } from "@/types";

export function useRecommendations(query: RecommendationQuery = {}) {
  return useQuery({
    queryKey: ["recommendations", query],
    queryFn: () => recommendationsService.list(query),
  });
}

export function useRecommendation(id: number | undefined) {
  return useQuery({
    queryKey: ["recommendation", id],
    queryFn: () => recommendationsService.get(id as number),
    enabled: typeof id === "number" && !Number.isNaN(id),
  });
}

export function useSaveRecommendation(id?: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RecommendationPayload) =>
      id ? recommendationsService.update(id, payload) : recommendationsService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
      if (id) queryClient.invalidateQueries({ queryKey: ["recommendation", id] });
    },
  });
}

export function useDeleteRecommendation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => recommendationsService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["recommendations"] }),
  });
}
