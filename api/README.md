# Rotas

## Usuário:

- Criar usuário: POST => /users
  {
  "name": "Gabriel",
  "email": "gabriel5@gmail.com",
  "password": "Gabrielsenha"
  }
- Autenticar usuário: POST => /sessions

## Initializing Chroma (Descontinuado)

Chroma foi substituido pelo FaissVectorStore, do Facebook

`git clone https://github.com/chroma-core/chroma.git
cd chroma
docker compose up -d --build`
