import os
from dotenv import load_dotenv

load_dotenv()

# GMGN Solana Trading API Endpoint (No API Key Required)
GMGN_SWAP_URL = 
"https://gmgn.ai/defi/router/v1/sol/tx/get_swap_route?token_in_address=${inputToken}&token_out_address=${outputToken}&in_amount=${amount}&from_address=${fromAddress}&slippage=${slippage}>"

# Dexscreener API URL for Solana token info
DEXSCREENER_URL = 
"https://api.dexscreener.com//token-profiles/latest/v1"

# Database connection URL for PostgreSQL
DB_URL = os.getenv("DATABASE_URL")

