from django.shortcuts import render
from rest_framework import generics
from .serializers import VentaSerializer, VentaCreateSerializer, VentaDetalleSerializer
from .models import Venta, VentaDetalle
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.pagination import PageNumberPagination

class VentasPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

# Create your views here.
class ListarVentas(generics.ListCreateAPIView):
    queryset = Venta.objects.all().order_by('-fecha')
    serializer_class = VentaSerializer
    pagination_class = VentasPagination
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return VentaCreateSerializer
        return VentaSerializer
    
    def create(self, request, *args, **kwargs):
        # al crear una venta, se debe añadir el usuario que la crea
        request.data['usuario'] = request.user.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    
class VerVenta(generics.RetrieveUpdateDestroyAPIView):
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer


class ListarVentaDetalles(generics.ListCreateAPIView):
    queryset = VentaDetalle.objects.all()
    serializer_class = VentaDetalleSerializer

    def get_queryset(self):
        if 'pk' in self.kwargs:
            return VentaDetalle.objects.filter(venta_id=self.kwargs['pk'])
        return VentaDetalle.objects.all()


@permission_classes([IsAuthenticated])
class MisCompras(generics.ListAPIView):
    serializer_class = VentaSerializer
    pagination_class = VentasPagination
    def get_queryset(self):
        return Venta.objects.filter(usuario=self.request.user).order_by('-fecha')