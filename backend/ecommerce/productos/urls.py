from django.urls import path
from . import views

urlpatterns = [
    path('productos/', views.ProductosList.as_view()),
    path('productos/<int:pk>/', views.ProductosDetail.as_view()),
]