from django.shortcuts import render
from rest_framework import generics
from .serializers import ProductosSerializer
from .models import Productos, ProductosFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from django.contrib.postgres.search import TrigramSimilarity
from .serializers import CategoriasSerializer
from .models import Categorias
from .models import Tag
from .serializers import TagsSerializer 

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

class ProductosCoincide(generics.ListAPIView):
  queryset = Productos.objects.all()
  serializer_class = ProductosSerializer

  def get_queryset(self):
    nombre = self.kwargs['nombre']
    return Productos.objects.annotate(
      similarity=TrigramSimilarity('nombre', nombre)
    ).filter(
      similarity__gt=0.1 # 10% similarity
    ).order_by('-similarity')


class CategoriasList(generics.ListCreateAPIView):
    queryset = Categorias.objects.all() 
    serializer_class = CategoriasSerializer    

class CategoriasDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categorias.objects.all()  
    serializer_class = CategoriasSerializer  

class TagsPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class TagsList(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagsSerializer
    pagination_class = TagsPagination

class TagsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagsSerializer

