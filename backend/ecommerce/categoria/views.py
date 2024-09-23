from rest_framework import generics
from .serializers import CategoriasSerializer
from .models import Categorias


class CategoriasList(generics.ListCreateAPIView):
    queryset = Categorias.objects.all() 
    serializer_class = CategoriasSerializer    
    filter_backends = (DjangoFilterBackend,)  
    filterset_class = CategoriasFilter  

class CategoriasDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categorias.objects.all()  
    serializer_class = CategoriasSerializer  