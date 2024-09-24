from django.contrib import admin
from .models import Tag 

class TagAdmin(admin.ModelAdmin):
    list_display = ('id','nombre','idCategoria')
    search_fields = ('nombre','idCategoria')
    list_filter = ('idCategoria')

admin.site.register(Tag, TagAdmin)


# Register your models here.
