from django.db import models
import django_filters

class Productos(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.FloatField()
    stock = models.IntegerField()
    imagen = models.ImageField(upload_to='productos', null=True, blank=True)

    def __str__(self):
        return self.nombre
    
class Categorias(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    
class ProductosFilter(django_filters.FilterSet):
    nombre = django_filters.CharFilter(field_name='nombre', lookup_expr='icontains')
    precioMinimo = django_filters.NumberFilter(field_name='precio', lookup_expr='gte')
    precioMaximo = django_filters.NumberFilter(field_name='precio', lookup_expr='lte')
    class Meta:
        model = Productos
        fields = ['nombre', 'precioMinimo', 'precioMaximo']

