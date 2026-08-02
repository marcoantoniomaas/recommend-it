"""seed categories and sample recommendations

Revision ID: 0002
Revises: 0001
"""
import sqlalchemy as sa
from alembic import op

revision = "0002"
down_revision = "0001"
branch_labels = None
depends_on = None

CATEGORIES = [
    ("Filmes", "filmes", "Clapperboard"),
    ("Séries", "series", "Tv"),
    ("Jogos", "jogos", "Gamepad2"),
    ("Livros", "livros", "BookOpen"),
    ("Restaurantes", "restaurantes", "UtensilsCrossed"),
    ("Comidas", "comidas", "Pizza"),
    ("Música", "musica", "Music"),
    ("Lugares", "lugares", "MapPin"),
    ("Outros", "outros", "Sparkles"),
]

RECOMMENDATIONS = [
    {
        "title": "Blade Runner 2049",
        "category": "filmes",
        "description": "Ficção científica noir com fotografia impecável do Roger Deakins. Longo, contemplativo e absurdamente bonito.",
        "by": "Marina",
        "cover": "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
        "tags": ["ficção científica", "noir", "cult"],
        "links": [("IMDb", "https://www.imdb.com/title/tt1856101/")],
    },
    {
        "title": "Dark",
        "category": "series",
        "description": "Série alemã sobre viagem no tempo. Precisa de atenção total, mas fecha todos os fios no final.",
        "by": "Rafael",
        "cover": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=80",
        "tags": ["suspense", "viagem no tempo", "netflix"],
        "links": [("Netflix", "https://www.netflix.com/title/80100172")],
    },
    {
        "title": "Disco Elysium",
        "category": "jogos",
        "description": "RPG sem combate, só diálogo e decisões. Escrita nível literatura.",
        "by": "Ana",
        "cover": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
        "tags": ["rpg", "indie", "narrativo"],
        "links": [("Steam", "https://store.steampowered.com/app/632470/")],
    },
    {
        "title": "Torto Arado",
        "category": "livros",
        "description": "Romance brasileiro sobre duas irmãs no oeste da Bahia. Começa devagar e depois não larga mais.",
        "by": "Juliana",
        "cover": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
        "tags": ["literatura brasileira", "drama"],
        "links": [("Goodreads", "https://www.goodreads.com/book/show/48575828")],
    },
    {
        "title": "Bar do Português",
        "category": "restaurantes",
        "description": "Boteco de esquina com o melhor bolinho de bacalhau da cidade. Chega cedo, lota rápido.",
        "by": "Carlos",
        "cover": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
        "tags": ["boteco", "petiscos"],
        "links": [("Google Maps", "https://maps.google.com/?q=bar+do+portugues")],
    },
    {
        "title": "Ramen caseiro de 12 horas",
        "category": "comidas",
        "description": "Receita de caldo tonkotsu que dá trabalho mas vale cada minuto. Faz no domingo.",
        "by": "Pedro",
        "cover": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80",
        "tags": ["receita", "japonesa", "fim de semana"],
        "links": [("YouTube", "https://www.youtube.com/watch?v=9WXIrnWsaCo")],
    },
    {
        "title": "Blonde on Blonde — Bob Dylan",
        "category": "musica",
        "description": "Disco duplo de 1966. Coloca no fone, do começo ao fim, sem pular faixa.",
        "by": "Marina",
        "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
        "tags": ["clássico", "folk rock", "vinil"],
        "links": [("Spotify", "https://open.spotify.com/album/26LcMuTNhwHy4kAiJXhGGN")],
    },
    {
        "title": "Vale do Pati — Chapada Diamantina",
        "category": "lugares",
        "description": "Trekking de 3 dias entre vales e cachoeiras, dormindo em casa de nativos. Melhor coisa que já fiz.",
        "by": "Rafael",
        "cover": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        "tags": ["trilha", "natureza", "brasil"],
        "links": [("Google Maps", "https://maps.google.com/?q=vale+do+pati")],
    },
    {
        "title": "Podcast Foro de Teresina",
        "category": "outros",
        "description": "Análise semanal de política brasileira com bom humor. Uma hora por semana bem investida.",
        "by": "Ana",
        "cover": "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
        "tags": ["podcast", "política", "semanal"],
        "links": [("Spotify", "https://open.spotify.com/show/2gGrHzMnvNXFvVwzJc9YkS")],
    },
    {
        "title": "Hollow Knight",
        "category": "jogos",
        "description": "Metroidvania difícil, silencioso e melancólico. Trilha sonora sensacional.",
        "by": "Pedro",
        "cover": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
        "tags": ["metroidvania", "indie", "difícil"],
        "links": [
            ("Steam", "https://store.steampowered.com/app/367520/"),
            ("Site oficial", "https://hollowknight.com/"),
        ],
    },
]


def _slug(value: str) -> str:
    import re, unicodedata

    v = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", v).strip("-")


def upgrade() -> None:
    conn = op.get_bind()

    for name, slug, icon in CATEGORIES:
        conn.execute(
            sa.text(
                "INSERT INTO categories (name, slug, icon) VALUES (:n, :s, :i) "
                "ON CONFLICT (slug) DO NOTHING"
            ),
            {"n": name, "s": slug, "i": icon},
        )

    category_ids = {
        row[0]: row[1] for row in conn.execute(sa.text("SELECT slug, id FROM categories"))
    }

    for item in RECOMMENDATIONS:
        rec_id = conn.execute(
            sa.text(
                "INSERT INTO recommendations "
                "(title, description, recommended_by, cover_image_url, category_id) "
                "VALUES (:t, :d, :b, :c, :cat) RETURNING id"
            ),
            {
                "t": item["title"],
                "d": item["description"],
                "b": item["by"],
                "c": item["cover"],
                "cat": category_ids[item["category"]],
            },
        ).scalar_one()

        for label, url in item["links"]:
            conn.execute(
                sa.text(
                    "INSERT INTO links (recommendation_id, label, url) VALUES (:r, :l, :u)"
                ),
                {"r": rec_id, "l": label, "u": url},
            )

        for tag_name in item["tags"]:
            tag_slug = _slug(tag_name)
            conn.execute(
                sa.text(
                    "INSERT INTO tags (name, slug) VALUES (:n, :s) ON CONFLICT (slug) DO NOTHING"
                ),
                {"n": tag_name, "s": tag_slug},
            )
            tag_id = conn.execute(
                sa.text("SELECT id FROM tags WHERE slug = :s"), {"s": tag_slug}
            ).scalar_one()
            conn.execute(
                sa.text(
                    "INSERT INTO recommendation_tags (recommendation_id, tag_id) "
                    "VALUES (:r, :t) ON CONFLICT DO NOTHING"
                ),
                {"r": rec_id, "t": tag_id},
            )


#def downgrade() -> None:
#    conn = op.get_bind()
#    conn.execute(sa.text("DELETE FROM recommendation_tags"))
#    conn.execute(sa.text("DELETE FROM links"))
#    conn.execute(sa.text("DELETE FROM recommendations"))
#    conn.execute(sa.text("DELETE FROM tags"))
#    conn.execute(sa.text("DELETE FROM categories"))
