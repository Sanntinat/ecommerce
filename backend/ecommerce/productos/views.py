from django.shortcuts import render
from rest_framework import generics
from .serializers import ProductosSerializer
from .models import Productos, ProductosFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination

class ProductosPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

class ProductosList(generics.ListCreateAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer
    pagination_class = ProductosPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ProductosFilter

class ProductosDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer
