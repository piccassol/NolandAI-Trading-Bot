import tweepy
from app.config import TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET

auth = tweepy.OAuthHandler(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET)
auth.set_access_token(TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET)
api = tweepy.API(auth)

def send_tweet(message: str):
    """Handles tweet execution"""
    try:
        api.update_status(message)
        return {"status": "success", "message": f"Tweet '{message}' sent!"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
