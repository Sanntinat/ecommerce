from rest_framework.views import APIView
from rest_framework.response import Response
import random
from custom_auth.models import User
from productos.models import Tag, Productos
from productos.serializers import ProductosSerializer 

class ProductosPorTags(APIView):
    def get(self, request, *args, **kwargs):
        tag_ids = request.query_params.getlist('tag_ids', [])

        if not tag_ids:
            return Response({'message': 'faltan idTags'}, status=400)

        productos = Productos.objects.filter(idTag__in=tag_ids)[:10]
        productos_data = ProductosSerializer(productos, many=True).data

        return Response({'productos': productos_data}) 

class SimulateAPI(APIView):
    def get(self, request, *args,**kwargs):
        users = list(User.objects.all())
        selected_users = random.sample(users, min(4, len(users)))
        tags = Tag.objects.filter(idCategoria__in=[3,4])
        rutinaLista = random.sample(list(tags), min(3, len(tags)))

        data = [
                {
                    "correo": user.email,
                    "rutina": [tag.id for tag in rutinaLista]
                }
                for user in selected_users
            ]
        return Response(data)    
