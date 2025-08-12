# Manual de Instalación - Servicio Node.js para WhatsApp

## Requisitos previos
- Servidor Linux (Ubuntu/CentOS)
- Acceso a terminal con permisos sudo
- Conexión a internet
- Cuenta de GitLab (opcional para repositorios privados)

## Pasos de instalación

### 1. Crear directorio de trabajo

```bash
mkdir opt/servidorWhatsapp
cd opt/servidorWhatsapp 

cd ~/servidorWhatsapp 
```

### 2. Instalar Node.js 22 y npm
- Para Ubuntu/Debian:

# Descarga e instala nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
# en lugar de reiniciar la shell
\. "$HOME/.nvm/nvm.sh"
# Descarga e instala Node.js:
nvm install 22
# Verifica la versión de Node.js:
node -v # Debería mostrar "v22.18.0".
nvm current # Debería mostrar "v22.18.0".
# Verifica versión de npm:
npm -v # Debería mostrar "10.9.3".

```
node --version
npm --versio


### 3. Clonar repositorio
```
git clone https://gitlab.com/jairorivero/whatsapp-node 
cd servidorWhatsapp 
```

### 4. Instalar dependencias
```
npm install
```
### 6. Ejecutar el servicio
```
nohup node app > codigo.txt  &
```
### 7. Obtener código QR
```
cat  codigo.txt
```

### EN CASO DE ERROR HAY QUE HACER ESTO PASOS

error while loading shared libraries: libdrm.so.2: cannot open shared object file: No such file or directory
Esto significa que tu sistema no tiene las bibliotecas necesarias para ejecutar Chrome/Chromium que Puppeteer necesita.

Soluciones posibles:
1. Instalar las dependencias faltantes (recomendado)
Ejecuta estos comandos en tu servidor (  distribución Linux):

Para Ubuntu/Debian:

```basH
sudo apt-get update
sudo apt-get install -y gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget libdrm2
```

### YA PUEDE EJECUTAR EL SERVICIO 
Los paso 6. Ejecutar el servicio y 7. Obtener código QR

### PARA PODER LEER QR Y EL SERVICIO SE MANTEGA ACTIVO 
## INSTALAR PM2 
Opción 1: Usar PM2 (Recomendado)
PM2 es un administrador de procesos para Node.js que mantiene tus aplicaciones activas y permite reinicios automáticos.

Instala PM2 globalmente:

bash
npm install -g pm2
Inicia tu aplicación con PM2:

bash
pm2 start app.js --name "mi-app"
pm2 start app.js --name "mi-app2" --no-daemon
