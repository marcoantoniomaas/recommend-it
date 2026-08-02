import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "@/components/Layout";
import { CategoriesPage } from "@/pages/CategoriesPage";
import { CategoryPage } from "@/pages/CategoryPage";
import { EditRecommendationPage } from "@/pages/EditRecommendationPage";
import { HomePage } from "@/pages/HomePage";
import { NewRecommendationPage } from "@/pages/NewRecommendationPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { RecommendationDetailPage } from "@/pages/RecommendationDetailPage";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="categorias" element={<CategoriesPage />} />
            <Route path="categorias/:slug" element={<CategoryPage />} />
            <Route path="recomendacoes/nova" element={<NewRecommendationPage />} />
            <Route path="recomendacoes/:id" element={<RecommendationDetailPage />} />
            <Route path="recomendacoes/:id/editar" element={<EditRecommendationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
