from rest_framework import serializers
from .models import Venta, VentaDetalle
from productos.models import Productos

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = ['id', 'nombre', 'imagen_url']

class VentaDetalleSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)

    class Meta:
        model = VentaDetalle
        fields = '__all__'
        extra_kwargs = {
            'subtotal': {'read_only': True},
            'venta': {'read_only': True},
        }

class VentaCreateSerializer(serializers.ModelSerializer):
    detalles = serializers.ListField(child=serializers.DictField(), write_only=True)
    class Meta:
        model = Venta
        fields = '__all__'
        extra_kwargs = {
            'total': {'read_only': True},
        }
    def create(self, validated_data):
        detalles_data = validated_data.pop('detalles')
        venta = Venta.objects.create(**validated_data, total=0)
        # print('venta', venta)
        total = 0
        productos_sin_stock = []
        for detalle_data in detalles_data:
            producto_id = detalle_data['producto']
            producto = Productos.objects.get(id=producto_id)
            if producto.stock < detalle_data['cantidad']:
                productos_sin_stock.append(producto.nombre)
        
        if productos_sin_stock:
            venta.delete()
            raise serializers.ValidationError({'productos_sin_stock': productos_sin_stock})

        for detalle_data in detalles_data:
            producto_id = detalle_data.pop('producto')
            venta_detalle = VentaDetalle.objects.create(
                venta=venta,
                producto=Productos.objects.get(id=producto_id),
                **detalle_data
            )
            venta_detalle.producto.stock -= venta_detalle.cantidad
            venta_detalle.producto.save()
            total += venta_detalle.subtotal
            # print('detalle_data', detalle_data)
        # print('total', total)
        venta.total = total
        venta.save()
        return venta
    
class VentaDetalleIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentaDetalle
        fields = ['id']  # Solo devolver el ID


class VentaSerializer(serializers.ModelSerializer):
    usuario_email = serializers.EmailField(source='usuario.email', read_only=True)
    detalles = VentaDetalleIdSerializer(source='venta_detalles', many=True, read_only=True)
    estado = serializers.ChoiceField(choices=Venta.ESTADO_CHOICES)  

    class Meta:
        model = Venta
        fields = '__all__'
        extra_kwargs = {
            'total': {'read_only': True},
            'usuario': {'read_only': True}, 
        }

