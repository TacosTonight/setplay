import requests
from datetime import timedelta
from django.utils import timezone


def calculate_token_expiration_time(expires_in):
    return timezone.now() + timedelta(seconds=expires_in)


def get_spotify_token_response(url, params=None, data=None):
    r = requests.post(url, params=params, data=data)
    if r.status_code != requests.codes.ok:
        return None
    return r.json()
