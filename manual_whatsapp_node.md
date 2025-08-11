# Manual de Instalación - Servicio Node.js para WhatsApp

## Requisitos previos
- Servidor Linux (Ubuntu/CentOS)
- Acceso a terminal con permisos sudo
- Conexión a internet
- Cuenta de GitLab (opcional para repositorios privados)

## Pasos de instalación

### 1. Crear directorio de trabajo

```bash
mkdir ~/servidorWhatsapp
cd ~/servidorWhatsapp 
```

### 2. Instalar Node.js y npm
- Para Ubuntu/Debian:

```sudo apt update
sudo apt install -y nodejs npm
```

- Para CentOS/RHEL:
```bash
sudo yum install -y nodejs npm
```

### 3. Clonar repositorio
```
git clone https://gitlab.com/jairorivero/whatsapp-node 
```
### 4. Verificar instalación
```
node --version
npm --version
```
### 5. Instalar dependencias
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
