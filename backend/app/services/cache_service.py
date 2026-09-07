import os
import redis
import json
from typing import Optional, Any

class CacheService:
    def __init__(self):
        redis_url = os.getenv("REDIS_URL", "redis://redis:6379/0")
        self.client = redis.from_url(redis_url, decode_responses=True)

    def set(self, key: str, value: Any, ex: int = 3600):
        """Set value in cache with expiration in seconds."""
        serialized = json.dumps(value)
        self.client.set(key, serialized, ex=ex)

    def get(self, key: str) -> Optional[Any]:
        """Get value from cache."""
        data = self.client.get(key)
        if data:
            return json.loads(data)
        return None

    def delete(self, key: str):
        self.client.delete(key)

# Singleton instance
cache_service = CacheService()
