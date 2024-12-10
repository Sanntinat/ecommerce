from django.shortcuts import render
from rest_framework import generics
from .serializers import ProductosSerializer
from .serializers import ProductosSerializerV2
from .models import Productos
from .filters import ProductosFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from django.contrib.postgres.search import TrigramSimilarity
from .serializers import CategoriasSerializer
from .models import Categorias
from .models import Tag
from .serializers import TagsSerializer 
from django import http
from rest_framework.permissions import BasePermission

class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        return request.user and request.user.is_staff


class ProductosPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class ProductosDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer
    permission_classes = [IsAdminOrReadOnly]

class ProductosDetailV2(generics.RetrieveAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializerV2
    permission_classes = [IsAdminOrReadOnly]

    def get_object(self):
        # Incrementar la popularidad del producto
        obj = super().get_object()
        print(obj.id, ' ',obj.popularidad)
        obj.popularidad += 1
        obj.save()
        return super().get_object()


class ProductosList(generics.ListCreateAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer
    pagination_class = ProductosPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ProductosFilter
    permission_classes = [IsAdminOrReadOnly]

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
                similarity__gt=0.05
            ).order_by('-similarity')

        # Si 'orden' está presente, aplicar el orden por precio
        if orden == 'asc':
            queryset = queryset.order_by('precio')
        elif orden == 'desc':
            queryset = queryset.order_by('-precio')
        
        #Aumentar la popularidad de los productos consultados
        # for producto in queryset[:20]:
        #     producto.popularidad += 1
        #     print(producto.id)
        #     producto.save()

        return queryset.distinct()

class ProductosDestacados(generics.ListAPIView):
    serializer_class = ProductosSerializer
    def get_queryset(self):
        return Productos.objects.all().order_by('-popularidad')[:10]

class CategoriasList(generics.ListCreateAPIView):
    queryset = Categorias.objects.all() 
    serializer_class = CategoriasSerializer 
    permission_classes = [IsAdminOrReadOnly]

class CategoriasDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categorias.objects.all()  
    serializer_class = CategoriasSerializer
    permission_classes = [IsAdminOrReadOnly]

class TagsList(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagsSerializer
    permission_classes = [IsAdminOrReadOnly]

class TagsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagsSerializer
    permission_classes = [IsAdminOrReadOnly]

class TagsDeCategoria(generics.ListAPIView):
    serializer_class = TagsSerializer
    def get_queryset(self):
        nombre_categoria = self.kwargs['cat']
        tags = Tag.objects.filter(idCategoria__nombre=nombre_categoria)
        if len(tags):
            return tags
        else:
            raise http.Http404("No se encontraron tags para la categoría especificada")