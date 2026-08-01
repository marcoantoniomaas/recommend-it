import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface Props {
  categories: Category[];
  active?: string;
  onSelect: (slug?: string) => void;
}

export function CategoryChips({ categories, active, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect(undefined)}
        className={cn(
          "rounded-sm border px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.18em] transition-colors",
          !active
            ? "border-primary bg-primary/15 text-primary"
            : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
        )}
      >
        Tudo
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelect(category.slug)}
          className={cn(
            "rounded-sm border px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.18em] transition-colors",
            active === category.slug
              ? "border-primary bg-primary/15 text-primary"
              : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
