# Recomenda Aí
> Roadmap Técnico (Versão Inicial)

## Visão Geral

O **Recomenda Aí** é uma plataforma colaborativa de recomendações onde usuários podem avaliar e recomendar qualquer tipo de item (filmes, músicas, livros, restaurantes, jogos, lugares, aplicativos, etc.), compartilhando essas recomendações em grupos privados e contribuindo para rankings globais.

O projeto busca evitar duplicidade de informações utilizando bases de dados públicas e confiáveis sempre que possível, preservando a privacidade dos usuários através da anonimização dos dados e, futuramente, utilizando Inteligência Artificial para melhorar as recomendações.

---

# Objetivos

- Centralizar recomendações em uma única plataforma.
- Evitar cadastros duplicados.
- Permitir grupos privados.
- Gerar rankings automaticamente.
- Preservar privacidade dos usuários.
- Facilitar futuras recomendações inteligentes utilizando IA.

---

# Roadmap

## 1. Autenticação

### Objetivo

Permitir que cada recomendação esteja vinculada a um usuário.

### Funcionalidades

- Login obrigatório
- OAuth2 / OpenID Connect
- Login com:
    - Google
    - GitHub
    - Microsoft
    - Apple (futuro)
- Possibilidade de adicionar novos provedores
- Cadastro por e-mail (futuro)

### Benefícios

- Segurança
- Histórico do usuário
- Sincronização entre dispositivos
- Redução de contas falsas

---

# 2. Grupos Privados

## Objetivo

Permitir que amigos, famílias e equipes compartilhem recomendações próprias.

### Funcionalidades

- criação de grupos
- administrador
- convite por link
- identificador único
- compartilhamento via WhatsApp
- entrada por convite

Exemplo

```
https://recomenda.ai/g/8F3A9B
```

Cada grupo possui:

- membros
- ranking próprio
- recomendações próprias

---

# 3. Integração com Bases Oficiais

Sempre que existir uma base pública consolidada, ela será utilizada.

## Categorias

| Categoria | Fonte sugerida |
|------------|----------------|
| Filmes | IMDb / TMDb |
| Séries | TMDb |
| Música | Spotify / MusicBrainz |
| Livros | Google Books / OpenLibrary |
| Jogos | IGDB |
| Restaurantes | Google Places |
| Lugares | Google Places / OpenStreetMap |
| Podcasts | Spotify / Apple Podcasts |
| Empresas | Google Places |
| Aplicativos | Google Play / App Store |

### Funcionamento

1. Usuário pesquisa.
2. Sistema consulta API.
3. Usuário seleciona o item.
4. Apenas o identificador externo é salvo.
5. Metadados podem ser sincronizados futuramente.

### Benefícios

- evita duplicidade
- atualizações automáticas
- melhor qualidade dos dados

---

# 4. Perfil do Usuário

## Objetivo

Permitir análises estatísticas preservando privacidade.

Todas as informações são opcionais.

### Dados possíveis

- faixa etária
- sexo
- estado
- país
- cidade
- idiomas
- gêneros favoritos
- interesses
- estilo de vida

### Uso

Esses dados serão utilizados apenas de forma agregada.

Exemplos

> Pessoas entre 25 e 35 anos deram nota média 4,8.

> Usuários do Nordeste gostaram mais deste restaurante.

> Pessoas com perfil semelhante ao seu também recomendaram...

Nunca será possível identificar usuários individualmente.

---

# 5. Sistema Único de Avaliação

## Conceito

O usuário avalia um item apenas uma vez.

Essa avaliação automaticamente participa de vários contextos.

Exemplo

```
Marco

★★★★★ Interestelar
```

Essa única avaliação compõe automaticamente:

- perfil pessoal
- grupos privados
- ranking global
- ranking regional
- ranking por faixa etária
- ranking por gênero
- ranking por interesses

Não existe necessidade de avaliar novamente o mesmo item em outro grupo.

Cada grupo representa apenas uma forma diferente de visualizar o conjunto de avaliações.

### Benefícios

- simplicidade
- consistência
- menos duplicação de dados

---

# 6. Curadoria

Nem todas as categorias possuem bases oficiais.

Exemplos

- comidas
- pratos
- experiências
- eventos
- pequenos estabelecimentos
- produtos artesanais

Nestes casos haverá um fluxo de aprovação.

```
Usuário cria

↓

Fila

↓

Curadoria

↓

Aprovado

↓

Disponível
```

Objetivos

- evitar spam
- evitar duplicidades
- manter padronização
- manter qualidade da base

---

# 7. Inteligência Artificial

A IA será utilizada apenas como apoio.

Jamais como fonte única da informação.

## Inserção Assistida

Exemplo

```
Comi um hambúrguer artesanal na Ponta Verde.
```

A IA identifica automaticamente

- categoria
- restaurante
- localização
- possíveis correspondências

reduzindo o preenchimento manual.

---

## Recomendações Inteligentes

A IA poderá utilizar

- histórico do usuário
- preferências
- avaliações
- grupos
- clusters
- dados anonimizados

Exemplos

> O que assistir hoje?

> Livros parecidos com Duna.

> Restaurantes japoneses próximos.

---

## Clusterização

Além de idade ou região, usuários poderão ser agrupados automaticamente por comportamento.

Exemplo

```
★★★★★ Interestelar
★★★★★ Fundação
★★★★★ Duna

↓

Cluster

Ficção Científica
Astronomia
Tecnologia
```

Esses clusters alimentarão futuras recomendações.

---

# Arquitetura Conceitual

```
                    Usuários
                        │
                        ▼
                 Autenticação OAuth
                        │
                        ▼
                    API FastAPI
                        │
      ┌─────────────────┼─────────────────┐
      │                 │                 │
      ▼                 ▼                 ▼
 PostgreSQL         MinIO            APIs Externas
                                       │
                                       ├── IMDb/TMDb
                                       ├── Spotify
                                       ├── Google Books
                                       ├── Google Places
                                       └── Outras

                        │
                        ▼
             Base de Recomendações
                        │
      ├──────────────────────────────────┐
      ▼                                  ▼
 Grupos Privados                 Rankings Globais
      │                                  │
      └──────────────┬───────────────────┘
                     ▼
         Estatísticas Anonimizadas
                     │
                     ▼
              Motor de IA (Futuro)
```

---

# Modelo Conceitual

A arquitetura é baseada em um conceito simples:

> **Cada usuário possui apenas uma avaliação para cada item.**

Todo o restante é derivado automaticamente.

Uma única avaliação alimenta:

- perfil pessoal
- grupos privados
- rankings
- estatísticas
- IA

Isso reduz duplicação de dados, facilita manutenção e garante consistência entre todas as visualizações.

---

# MVP Atual

## Implementado

- React
- FastAPI
- PostgreSQL
- MinIO
- Cadastro manual de itens
- Listagem
- Avaliações
- Grupos simples

## Fora do MVP

- Login
- Integrações externas
- Curadoria
- IA
- Estatísticas
- Recomendações inteligentes
- Clusterização
- Moderação

---

# Visão de Longo Prazo

O objetivo final do Recomenda Aí é se tornar uma plataforma universal de recomendações, onde qualquer pessoa possa descobrir os melhores filmes, músicas, livros, restaurantes, jogos, lugares, aplicativos e experiências com base nas avaliações da comunidade, dos seus grupos e de pessoas com gostos semelhantes, preservando sempre a privacidade dos usuários e utilizando inteligência artificial para tornar as recomendações cada vez mais relevantes.
