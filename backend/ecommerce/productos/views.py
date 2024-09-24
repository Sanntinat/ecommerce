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

class ProductosOrdered(generics.ListAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer

    def get_queryset(self):
        # Obtener los parámetros de la URL o de los query params (si existen)
        nombre = self.request.query_params.get('nombre', None)
        orden = self.request.query_params.get('orden', None)

        queryset = Productos.objects.all()

        # Si 'nombre' está presente en los parámetros, aplicar búsqueda de similitud
        if nombre:
            queryset = queryset.annotate(
                similarity=TrigramSimilarity('nombre', nombre)
            ).filter(
                similarity__gt=0.1  # 10% similar
            ).order_by('-similarity')

        # Si 'orden' está presente, aplicar el orden por precio
        if orden == 'asc':
            queryset = queryset.order_by('precio')
        elif orden == 'desc':
            queryset = queryset.order_by('-precio')

        return queryset

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

