import { Plus, Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/hooks/useCategories";
import { recommendationsService } from "@/services/recommendations";
import type { Recommendation, RecommendationPayload } from "@/types";

interface Props {
  initialValue?: Recommendation;
  submitLabel: string;
  isSubmitting?: boolean;
  error?: string | null;
  onSubmit: (payload: RecommendationPayload) => void;
}

type LinkDraft = { label: string; url: string };

export function RecommendationForm({
  initialValue,
  submitLabel,
  isSubmitting,
  error,
  onSubmit,
}: Props) {
  const { data: categories = [] } = useCategories();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recommendedBy, setRecommendedBy] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [coverUrl, setCoverUrl] = useState("");
  const [tags, setTags] = useState("");
  const [links, setLinks] = useState<LinkDraft[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!initialValue) return;
    setTitle(initialValue.title);
    setDescription(initialValue.description ?? "");
    setRecommendedBy(initialValue.recommended_by);
    setCategoryId(String(initialValue.category_id));
    setCoverUrl(initialValue.cover_image_url ?? "");
    setTags(initialValue.tags.map((tag) => tag.name).join(", "));
    setLinks(initialValue.links.map((link) => ({ label: link.label, url: link.url })));
  }, [initialValue]);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const { url } = await recommendationsService.uploadCover(file);
      setCoverUrl(url);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      title: title.trim(),
      description: description.trim() || null,
      recommended_by: recommendedBy.trim(),
      cover_image_url: coverUrl.trim() || null,
      category_id: Number(categoryId),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      links: links.filter((link) => link.label.trim() && link.url.trim()),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select value={categoryId} onValueChange={setCategoryId} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="by">Quem recomendou</Label>
            <Input
              id="by"
              value={recommendedBy}
              onChange={(e) => setRecommendedBy(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Por que vale a pena?"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="noir, cult, netflix"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Links externos</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setLinks((current) => [...current, { label: "", url: "" }])}
            >
              <Plus className="h-3.5 w-3.5" />
              Adicionar
            </Button>
          </div>

          {links.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              IMDb, Steam, Spotify, Google Maps, YouTube, site oficial...
            </p>
          ) : null}

          {links.map((link, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={link.label}
                placeholder="IMDb"
                className="w-1/3"
                onChange={(e) =>
                  setLinks((current) =>
                    current.map((item, i) =>
                      i === index ? { ...item, label: e.target.value } : item,
                    ),
                  )
                }
              />
              <Input
                value={link.url}
                placeholder="https://..."
                onChange={(e) =>
                  setLinks((current) =>
                    current.map((item, i) =>
                      i === index ? { ...item, url: e.target.value } : item,
                    ),
                  )
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Remover link"
                onClick={() => setLinks((current) => current.filter((_, i) => i !== index))}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <Button type="submit" size="lg" disabled={isSubmitting || uploading}>
          {isSubmitting ? "Salvando..." : submitLabel}
        </Button>
      </div>

      <aside className="space-y-3">
        <Label>Imagem de capa</Label>
        <div className="overflow-hidden rounded-sm border border-border bg-secondary">
          {coverUrl ? (
            <img src={coverUrl} alt="Prévia da capa" className="aspect-[2/3] w-full object-cover" />
          ) : (
            <div className="flex aspect-[2/3] items-center justify-center text-xs text-muted-foreground">
              Sem capa
            </div>
          )}
        </div>
        <Input
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          placeholder="URL da imagem"
        />
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-dashed border-border px-3 py-3 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-primary hover:text-primary">
          <Upload className="h-3.5 w-3.5" />
          {uploading ? "Enviando..." : "Enviar arquivo"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleUpload(file);
            }}
          />
        </label>
      </aside>
    </form>
  );
}
