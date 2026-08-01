import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Recomenda Aí — código-fonte do MVP" },
      {
        name: "description",
        content:
          "Repositório do Recomenda Aí: React + Vite no front, FastAPI + Postgres + MinIO no back, tudo via Docker Compose.",
      },
      { property: "og:title", content: "Recomenda Aí — código-fonte do MVP" },
      {
        property: "og:description",
        content:
          "Catálogo de recomendações do grupo. Código pronto para rodar com docker compose up --build.",
      },
    ],
  }),
  component: Index,
});

const STACK = [
  { label: "Frontend", value: "React · TypeScript · Vite · React Router · Tailwind · shadcn/ui" },
  { label: "Backend", value: "FastAPI · SQLAlchemy 2 · Alembic · Swagger em /docs" },
  { label: "Banco", value: "PostgreSQL 16 · migrations com seed (9 categorias, 10 exemplos)" },
  { label: "Arquivos", value: "MinIO (S3 compatível) para as imagens de capa" },
];

const PORTS = [
  { label: "Frontend", value: "localhost:5173" },
  { label: "API", value: "localhost:8000" },
  { label: "Swagger", value: "localhost:8000/docs" },
  { label: "MinIO", value: "localhost:9001" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
          Código-fonte gerado
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Recomenda Aí
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          O projeto completo está na pasta <code className="text-foreground">recomenda-ai/</code>{" "}
          deste repositório, com tema noir e pronto para rodar no seu ambiente.
        </p>

        <pre className="mt-8 overflow-x-auto rounded-md border border-border bg-card p-4 text-sm">
          <code>{"cd recomenda-ai\ndocker compose up --build"}</code>
        </pre>

        <dl className="mt-10 space-y-4">
          {STACK.map((item) => (
            <div key={item.label} className="border-t border-border pt-4">
              <dt className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm">{item.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {PORTS.map((port) => (
            <li
              key={port.label}
              className="rounded-md border border-border bg-card px-4 py-3 text-sm"
            >
              <span className="text-muted-foreground">{port.label}: </span>
              {port.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
