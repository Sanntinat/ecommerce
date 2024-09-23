from django.urls import path
from . import views

urlpatterns = [
    path('categorias/', views.CategoriasList.as_view()),
    path('categorias/<int:pk>/', views.CategoriasDetail.as_view()),
]