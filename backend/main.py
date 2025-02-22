from fastapi import FastAPI, HTTPException
from routes import trading, prices, users
import tweepy
import discord
from discord.ext import commands, tasks
import os
import requests
from dotenv import load_dotenv

# Load Environment Variables
load_dotenv()

# Initialize FastAPI
app = FastAPI()

# Include Trading Bot Routes
app.include_router(trading.router, prefix="/trade", tags=["Trading"])
app.include_router(prices.router, prefix="/prices", tags=["Prices"])
app.include_router(users.router, prefix="/users", tags=["Users"])

@app.get("/")
def home():
    return {"message": "Welcome to NolandAI, your Solana trading bot API!"}

# --------------- Twitter Integration ---------------
TWITTER_CONSUMER_KEY = os.getenv("TWITTER_CONSUMER_KEY")
TWITTER_CONSUMER_SECRET = os.getenv("TWITTER_CONSUMER_SECRET")
TWITTER_ACCESS_TOKEN = os.getenv("TWITTER_ACCESS_TOKEN")
TWITTER_ACCESS_SECRET = os.getenv("TWITTER_ACCESS_TOKEN_SECRET")

auth = tweepy.OAuthHandler(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET)
auth.set_access_token(TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET)
twitter_api = tweepy.API(auth)

@app.post("/tweet/")
def send_tweet(message: str):
    """Posts a tweet via API"""
    try:
        twitter_api.update_status(message)
        return {"status": "success", "message": "Tweet sent successfully!"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# --------------- Discord Bot Integration ---------------
DISCORD_BOT_TOKEN = os.getenv("DISCORD_BOT_TOKEN")
DISCORD_CHANNEL_ID = int(os.getenv("DISCORD_CHANNEL_ID"))  # Replace with actual channel ID

intents = discord.Intents.default()
intents.messages = True
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f"NolandAI is online as {bot.user}")
    auto_post.start()  # Starts automated Discord posting

@tasks.loop(hours=1)
async def auto_post():
    """Automatically posts tweets to Discord every hour"""
    channel = bot.get_channel(DISCORD_CHANNEL_ID)
    if channel:
        tweet = "🚀 NolandAI Market Update! Stay tuned for trading insights! #AI"
        twitter_api.update_status(tweet)  # Post to Twitter
        await channel.send(f"📢 {tweet}")  # Post to Discord

@bot.command()
async def tweet(ctx, *, message: str):
    """Allows Discord users to send tweets"""
    twitter_api.update_status(message)
    await ctx.send(f"Tweet sent: {message}")

if __name__ == "__main__":
    bot.run(DISCORD_BOT_TOKEN)
