from django.db import models
import django_filters

class Productos(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.FloatField()
    stock = models.IntegerField()
    imagen = models.ImageField(upload_to='productos', null=True, blank=True)
    tags = models.ManyToManyField('Tag', related_name='productos')

    def __str__(self):
        return self.nombre
    

class Categorias(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    

class Tag(models.Model):
    idCategoria = models.ForeignKey(Categorias, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nombre

class CharInFilter(django_filters.BaseInFilter, django_filters.CharFilter):
    pass

class ProductosFilter(django_filters.FilterSet):
    nombre = django_filters.CharFilter(lookup_expr='icontains')
    precioMinimo = django_filters.NumberFilter(field_name='precio', lookup_expr='gte')
    precioMaximo = django_filters.NumberFilter(field_name='precio', lookup_expr='lte')
    tags = CharInFilter(field_name='tags__nombre')
    categoria = django_filters.CharFilter(field_name='tags__idCategoria__nombre', lookup_expr='icontains')

    class Meta:
        model = Productos
        fields = ['precioMinimo', 'precioMaximo', 'tags', 'categoria']

