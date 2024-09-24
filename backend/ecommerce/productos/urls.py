from django.urls import path
from . import views

urlpatterns = [
    path('productos/', views.ProductosList.as_view()),
    path('productos/<int:pk>/', views.ProductosDetail.as_view()),
    path('productos/coincide/<str:nombre>/', views.ProductosCoincide.as_view()),
    path('categorias/', views.CategoriasList.as_view()),
    path('categorias/<int:pk>/', views.CategoriasDetail.as_view()),
]