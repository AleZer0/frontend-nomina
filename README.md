# 📊 App-Nómina - Transportes Godoy

Sistema integral de control de nóminas para la empresa **Transportes Godoy**, desarrollado para facilitar la gestión de empleados, pagos, préstamos, reportes semanales y más.

## 🚀 Tecnologías

### Frontend

- ⚡️ **Vite** – Entorno rápido de desarrollo.
- ⚛ **React** + **TypeScript** – Interfaz modular, escalable y tipada.
- 🎨 **TailwindCSS** – Estilos rápidos y responsivos.
- 🌐 **react-router-dom** – Manejo de rutas dinámicas.
- 🧹 **Prettier** – Formateo de código.
- 🧪 **ESLint** – Buenas prácticas y detección de errores.

### Backend

- 🟢 **Node.js** – Entorno de ejecución JavaScript.
- 🧬 **Hono** – Microframework moderno y rápido.
- 🐬 **MySQL** – Base de datos relacional.
- 🔄 **Prisma** – ORM moderno, tipado y potente.

### DevOps / Deploy

- 🐳 **Docker** – Contenedorización completa.
- 🐧 **Ubuntu Server** – Entorno de producción.
- 🌐 **Nginx** (implícito para HTTPS) – Proxy reverso.
- 🔐 **SSL** – Certificados ubicados en `/certs`:
- `_.xrom.cc.crt`
- `_.xrom.cc.key`

## 🌍 Dominio

El proyecto se encuentra desplegado en:

```
https://transportesgodoy-nomina.xrom.cc
```

## 📦 Docker

La aplicación se ejecuta en un contenedor llamado:

```
nomina-transportes-godpy
```

Construido desde la imagen:

```
app-nomina
```

Expone únicamente el **puerto 443** para conexiones HTTPS seguras.

## ✅ Funcionalidades

- Gestión de empleados y sueldos.
- Registro y visualización de nóminas.
- Administración de préstamos.
- Reportes semanales detallados.
- Paginación, ordenamiento y búsqueda por campos.
- Interfaz responsiva y amigable.
- Sistema de modales para crear, editar y ver detalles.
- Splash screen inicial con carga de datos.

## 🛡️ Seguridad

- Conexión segura HTTPS mediante certificados SSL.
- Validación y sanitización en backend.
- Navegación protegida por autenticación.
