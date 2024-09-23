from django.db import models
import django_filters

class Categorias(models.Model):
    nombre = models.CharField(max_length=100)
    

    def __str__(self):
        return self.nombre
    
class CategoriasFilter(django_filters.FilterSet):
    nombre = django_filters.CharFilter(field_name='nombre', lookup_expr='icontains')
    
    class Meta:
        model = Categorias
        fields = ['nombre']
