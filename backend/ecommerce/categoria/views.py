from rest_framework import generics
from .serializers import CategoriasSerializer
from .models import Categorias


class CategoriasList(generics.ListCreateAPIView):
    queryset = Categorias.objects.all() 
    serializer_class = CategoriasSerializer    

class CategoriasDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categorias.objects.all()  
    serializer_class = CategoriasSerializer  