from django.shortcuts import render
from rest_framework import generics
from .serializers import CategoriasSerializer
from .models import Categorias, CategoriasFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination

class CategoriasPagination(PageNumberPagination):
    page_size = 10  
    page_size_query_param = 'page_size'
    max_page_size = 100

class CategoriasList(generics.ListCreateAPIView):
    queryset = Categorias.objects.all() 
    serializer_class = CategoriasSerializer  
    pagination_class = CategoriasPagination  
    filter_backends = (DjangoFilterBackend,)  
    filterset_class = CategoriasFilter  

class CategoriasDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categorias.objects.all()  
    serializer_class = CategoriasSerializer  