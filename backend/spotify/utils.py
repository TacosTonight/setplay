import requests
from datetime import timedelta
from django.utils import timezone


def calculate_token_expiration_time(expires_in):
    try:
        return timezone.now() + timedelta(seconds=expires_in)
    except ValueError as e:
        print(e)


def handle_requests(url, method, headers=None, params=None, data=None, json=None):
    try:
        if method not in ["GET", "POST", "PUT", "DELETE"]:
            raise ValueError
        r = requests.request(
            method, url, headers=headers, params=params, data=data, json=json
        )
        r.raise_for_status()
        return r.json()
    except requests.exceptions.HTTPError as errh:
        print(errh)
    except requests.exceptions.RequestException as err:
        print(err)
    except ValueError as errv:
        print(errv)
