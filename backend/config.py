import os
from dotenv import load_dotenv

load_dotenv()

# gmgn.ai API keys
GMGN_API_KEY = os.getenv("GMGN_API_KEY")
GMGN_API_SECRET = os.getenv("GMGN_API_SECRET")

# Dexscreener API URL for Solana token info
DEXSCREENER_URL = "https://api.dexscreener.com/latest/dex/tokens/"

# Database connection URL for PostgreSQL
DB_URL = os.getenv("DATABASE_URL")
