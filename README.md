NOLAND — Solana-native LLM & Meme-Coin Trader
<p align="center">
  <img alt="NOLAND Logo" src="./2hT57dQm_400x400.jpg" width="160" />
</p>
</a> </p> <p align="center"> <a href="https://huggingface.co/piccassol/NOLAND"> <img alt="Hugging Face" src="https://img.shields.io/badge/HuggingFace-NOLAND-ffcc4d?logo=huggingface&logoColor=000&labelColor=fff"/> </a> <a href="https://x.com/ModdedParodyAI"> <img alt="Follow on X" src="https://img.shields.io/badge/Follow-@ModdedParodyAI-1DA1F2?logo=x&logoColor=white"/> </a> <a href="./LICENSE.txt"> <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-green.svg"/> </a> <img alt="Python" src="https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white"/> <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-0.115.x-009688?logo=fastapi&logoColor=white"/> <img alt="React" src="https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=000"/> <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-13+-336791?logo=postgresql&logoColor=white"/> <img alt="Docker" src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white"/> <img alt="Solana" src="https://img.shields.io/badge/Solana-Mainnet-14F195?logo=solana&logoColor=000"/> </p>

NOLAND is a Solana-focused LLM that reads on-chain/market context and can help trade memecoins for you.
It exposes a FastAPI backend, a React/Next-style frontend, and simple REST endpoints to fetch token info and execute trades.

✨ Features

Solana-trained LLM: purpose-built to reason about SOL ecosystems, token trends, and memecoin dynamics.

Trade execution: simple REST endpoint to place orders through a pluggable exchange service.

Token intel: price/metadata fetch via third-party APIs (Dexscreener, etc.).

Dashboard UI: a sleek dashboard to visualize balances, trades, and token charts.

Postgres persistence: users + trades schema under nolandai_trading.

🔗 Important Links

🤗 Hugging Face: NOLAND — https://huggingface.co/piccassol/NOLAND

🐦 Twitter/X: @ModdedParodyAI — https://x.com/ModdedParodyAI

🖼️ Logo source (profile photo): https://x.com/ModdedParodyAI/photo

Note: Some platforms (like X) require auth to render images in markdown. If the logo doesn’t display, replace the src with a hosted static image URL.

🧩 Architecture
/backend
  main.py            # FastAPI app: mounts /prices, /trade, /admin
  routes/            # prices, trading, users
  services/          # dexscreener client, exchange client, auth, twitter
  models/            # pydantic models (User, Trade)
  config.py          # external API URLs, DB_URL, keys
/frontend
  UI/                # modern dashboard components
  pages/             # Next-like pages (dashboard, settings)
  api/               # axios client bindings
docker-compose.yml   # db + backend + frontend (nginx) stack

🚀 Quick Start (Docker Compose)

Requires: Docker (24+) and Docker Compose.

Clone & env

git clone <this-repo>
cd <this-repo>

# Example env (use secure values in production!)
export DATABASE_URL=postgres://user:password@db:5432/nolandai_db
export SECRET_KEY=$(python - <<'PY'
import os; print(os.urandom(32).hex())
PY
)
export ALGORITHM=HS256
export ACCESS_TOKEN_EXPIRE_MINUTES=30

# Optional exchange / integrations
export GMGN_API_KEY=""     # if you have one
export GMGN_API_SECRET=""
export NOLANDAI_API_KEY="change-me"   # for admin/tweet endpoint


Compose up

docker compose up --build


Services

Backend API: http://localhost:8000

Frontend UI: http://localhost/

🛠️ API Overview

Base URL (default): http://localhost:8000

Prices
GET /prices/{token_address}


Returns token info/price for a given address.

Trading
POST /trade/{symbol}/{order_type}/{amount}
GET  /trade/history


order_type: market or limit (limit semantics depend on the exchange)

Saves successful trades in nolandai_trading.trades

Users (example/dev)
GET  /users
POST /users?username={name}&balance={float}
DELETE /users/{user_id}

Admin Tweet (optional)
POST /admin/tweet/?message=Hello
Headers: X-API-Key: <NOLANDAI_API_KEY>

⚙️ Configuration

Environment variables you’ll commonly set:

Variable	Description	Example
DATABASE_URL	Postgres connection URL	postgres://user:password@db:5432/nolandai_db
SECRET_KEY	JWT signing key	(random 32-byte hex)
ALGORITHM	JWT algorithm	HS256
ACCESS_TOKEN_EXPIRE_MINUTES	Token TTL	30
GMGN_API_KEY, GMGN_API_SECRET	Exchange API credentials	optional
NOLANDAI_API_KEY	Key for /admin/tweet	change-me
CORS_ALLOW_ORIGINS	Comma-sep allowed origins	http://localhost,http://localhost:3000

Frontend can target a remote API via:

NEXT_PUBLIC_API_URL=https://your-backend.example.com

🧪 Smoke Tests

After docker compose up:

# Backend healthy
curl http://localhost:8000/

# Price probe (address or symbol your service supports)
curl http://localhost:8000/prices/SOL

# Paper trade (without live keys you’ll see a guarded error)
curl -X POST http://localhost:8000/trade/SOL/market/1

# Trade history
curl http://localhost:8000/trade/history

📦 Development

Backend

cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload


Frontend

cd frontend
npm ci
npm run dev
# open http://localhost:3000

🔐 Security Notes

Do not commit real keys or mnemonics. Use .env + secret managers.

Rotate keys if they’ve ever been committed.

Add per-endpoint auth & rate-limits before public deployment.

Always test on devnet or with the exchange’s sandbox before mainnet.

🗺️ Roadmap

 First-class Solana wallet integrations & signing flow

 Strategy DSL for LLM-assisted execution

 Backtesting & PnL analytics

 Webhooks + TradingView signal ingestion

 LlamaIndex/agent graph for multi-source token intel

🤝 Contributing

PRs welcome! Please:

Open an issue describing the change

Keep PRs focused and tested

Follow the existing style

📝 License

MIT © 2025 Samuel Michel — see LICENSE.txt

<p align="center"> <i>Fast trade, fast copy trade — with a Solana-native LLM.</i> </p>
