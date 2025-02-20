from rest_framework.views import APIView
from rest_framework.response import Response
import random
from custom_auth.models import User
from productos.models import Tag, Productos
from productos.serializers import ProductosSerializer 

class ProductosPorTags(APIView):
    def get(self, request, *args, **kwargs):
        try:
            tag_ids = request.query_params.get('tag_ids', '')  # Obtener el parámetro tag_ids
            if tag_ids:
                tag_ids = tag_ids.split(',')  # Dividir la cadena
                tag_ids = [int(tag_id) for tag_id in tag_ids]  # Convertir cada elemento a entero
            else:
                return Response({'message': 'Faltan idTags'}, status=400)

            print("Tag IDs:", tag_ids)  # Verificar los tag_ids

            productos = Productos.objects.filter(tags__in=tag_ids)[:10]
            productos_data = ProductosSerializer(productos, many=True).data

            print("Productos Data:", productos_data)  # Ver los datos de los productos

            return Response({'productos': productos_data})

        except Exception as e:
            print("Error:", str(e))  # Capturar cualquier excepción y loguearla
            return Response({'error': str(e)}, status=500)

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
