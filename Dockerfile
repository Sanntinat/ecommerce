# Dockerfile optimizado para Django + React con Vite

# Imagen base con Python y Node.js
FROM python:3.10

# Instalar Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Aumentar límite de archivos abiertos
RUN apt-get install -y procps && \
    echo "fs.inotify.max_user_watches=524288" >> /etc/sysctl.conf && \
    sysctl -p

# Crear directorio de trabajo
WORKDIR /app

# Copiar y configurar el backend
COPY backend/ecommerce /app/backend
WORKDIR /app/backend
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copiar y configurar el frontend
WORKDIR /app/frontend
COPY frontend/E-commerce /app/frontend

# Limpiar y forzar instalación de dependencias
RUN rm -rf node_modules && npm cache clean --force && npm install --force

# Exponer puertos (Django en 8000, React en 5173)
EXPOSE 8000 5173

# Iniciar ambos servidores
CMD ["sh", "-c", "cd /app/backend && python manage.py migrate && python manage.py runserver 0.0.0.0:8000 & cd /app/frontend && npm run dev -- --host --force"]
