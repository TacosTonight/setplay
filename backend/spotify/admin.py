from django.contrib import admin
from .models import SpotifyToken

@admin.register(SpotifyToken)
class SpotifyTokenAdmin(admin.ModelAdmin):
    readonly_fields = ['created_at', 'modified_at']
    list_display = ('user','expires_in')