# Product Management Application

Esta es una aplicación Web Fullstack para la gestión de productos e inventario. La solución cuenta con un **Frontend** moderno construido con React (Vite) y un **Backend** seguro construido con .NET 10 LTS siguiendo el patrón de Clean Architecture (Arquitectura Limpia).

## Requisitos Previos
- **Node.js** (v18+) Por temas de tiempo 
- **.NET 10 SDK** (v10.0.301+)
- **SQL Server** (o SQL Express local)

---

## 1. Configuración del Entorno

### Configuración de la Base de Datos
1. El proyecto está configurado para ejecutarse con SQL Server Express local (`.\SQLEXPRESS01`).
2. En el archivo `BackEnd/ProductManagement.Api/appsettings.json`, valida la cadena de conexión:
   ```json
   "ConnectionStrings": {
     "SQLServerConnection": "Server=.\\SQLEXPRESS01;Database=ProductsDb;Trusted_Connection=True;TrustServerCertificate=True;"
   }
   ```
3. En la raiz del proyecto se encuentra el  script completo en `BD/schema.sql` por si deseas crear las tablas de manera manual en lugar de usar Migraciones de EF.

### Inicialización del Backend (.NET 10)
1. En la terminal navegar al directorio del proyecto principal:
   ```bash
   cd BackEnd/ProductManagement.Api
   ```
2. Restaura los paquetes y dependencias (Opcional, ocurre automáticamente):
   ```bash
   dotnet restore
   ```
3. Ejecuta el servidor (esto aplicará las migraciones de EF Core y creará la BD `ProductsDb` y tablas automáticamente si no existen):
   ```bash
   dotnet run
   ```
   La API se expondrá en `https://localhost:7194`.(en caso contrario verificar el puerto y editar BASE_URL de src.api.fetchClient)

### Inicialización del Frontend (React/Vite)
1. En terminal, ir al directorio de Frontend:
   ```bash
   cd FrontEnd
   ```
2. Instala los módulos de Node:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   La aplicación abrirá por defecto en `http://localhost:5173`.

---

## 2. Pruebas Básicas

### Autenticación y Cuentas
- Cuando la base de datos se inicializa vía *Entity Framework* (a través de `dotnet run`), automáticamente inserta un **Usuario Administrador** para pruebas:
  - **Email:** admin@email.com
  - **Password:** admin123
- También se puede registrar una nueva cuenta usando el botón de "**Regístrate**" en la pantalla de inicio de sesión (`/login`).

### Gestión de Productos (CRUD)
Al iniciar sesión exitosamente sera redirigido al panel de inventario, donde podrás realizar pruebas de las 4 operaciones (CRUD):
1. **Create**: Haz clic en el botón "Nuevo Producto", llena el formulario (validado en tiempo real) y selecciona un "Tipo de Producto" del menú desplegable. Haz clic en "Guardar".
2. **Read**: La tabla principal cargará y te mostrará una lista de productos en inventario con sus tipos relacionados. También puedes usar el botón de recargar.
3. **Update**: Haz clic en el botón del lápiz (Editar) en cualquier fila. Los campos se autocompletarán. Realiza cambios y guárdalos.
4. **Delete**: Haz clic en el icono del bote de basura (Eliminar). La aplicación te pedirá confirmación de seguridad antes de proceder.

---

## 3. Uso Correcto de Seguridad

La aplicación implementa rigurosas normas de seguridad para garantizar su integridad.

### Seguridad del Backend (API)
1. **Encriptación de Contraseñas (Hashing):** Las contraseñas en la base de datos están fuertemente protegidas. En vez de texto plano, se usa `BCrypt` para generar *Hashes* (con su respectiva "sal") antes de guardar el usuario.
2. **Autenticación Basada en Tokens JWT:** Una vez que un usuario hace Login exitoso, el Backend retorna un JSON Web Token firmado que expira automáticamente (por defecto en 15 minutos o se modifica según se requiera).
3. **Restricción de Recursos (`[Authorize]`):** Los endpoints del Controlador de Productos en `ProductsController` no son de acceso público. Exigen que se adjunte el JWT válido en las cabeceras HTTP (`Authorization: Bearer <token>`).
4. **Validación de Entradas (DTOs):** A nivel de aplicación, se evita la Inyección de Código limitando la entrada al uso de *Data Transfer Objects* (DTOs) que cuentan con restricciones de longitud (`[MaxLength]`) y rangos (`[Range]`).

### Seguridad del Frontend (React)
1. **Almacenamiento Local (Local Storage):** El JWT y la información básica de sesión del usuario se almacenan de manera local y son borrados explícitamente durante la función de *"Logout"*.
2. **Interceptor Centralizado (`fetchClient.js`):** En lugar de verificar el JWT de forma aislada para cada llamada, se desarrolló un cliente intermedio que:
   - Inyecta automáticamente el token JWT en las cabeceras HTTP (Headers) para llamadas autenticadas.
   - Si detecta que la API ha devuelto un `401 Unauthorized` (Token expirado o no válido), el cliente limpia de manera automática la sesión local y redirige obligatoriamente la aplicación a `/login`.
3. **Rutas Protegidas (`ProtectedRoute`):** En React-Router se encapsuló todo el bloque de operaciones CRUD bajo el wrapper `<ProtectedRoute>`. Ningún usuario sin identificar puede ver el Dashboard o la página de Productos por medio de rutas URL manuales; será redireccionado al instante.
4. **Validaciones Tempranas:** Para mejorar la experiencia, el frontend evita envíos defectuosos (precios menores a 0, valores vacíos) verificando las reglas antes del envío (Submit).
