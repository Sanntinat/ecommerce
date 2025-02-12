from django.urls import path
from .views import SimulateAPI, ProductosPorTags

urlpatterns = [
    path('gym/', SimulateAPI.as_view(), name='simulate-api'),
    path('ProductosPorTags', ProductosPorTags.as_view(), name='ProductosPorTags')
    ]
