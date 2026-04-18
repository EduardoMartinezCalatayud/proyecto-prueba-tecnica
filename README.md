# PROYECTO PRUEBA TÉCNICA

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

## DESCRIPCIÓN

Aplicación web desarrollada en Angular que permite la gestión de productos, incluyendo funcionalidades de listado, creación, edición, eliminación y visualización de detalles, consumiendo la Fake Store API.

## ENLACES

### Repositorio

Enlace de GitHub ([GitHub](https://github.com/EduardoMartinezCalatayud/proyecto-prueba-tecnica.git))

### Despliegue

Enlace de Despliegue [Enlace](https://pruebatecnica.appsimon.com)

## INSTRUCCIONES DE EJECUCIÓN
### Instalación y Ejecución

Ejecutar `npm install` para instalar dependencias proyecto, incluyendo PrimeNG y PrimeIcons.
Ejecutar `npm start`. Accede `http://localhost:9003/` que es el puerto configurado en el package.json. La aplicación se recargará automáticamente si se realizan cambios en el código fuente.

## PRUEBAS UNITARIAS

Ejecutar `ng test` Esto ejecutará las pruebas unitarias utilizando Karma. [Karma](https://karma-runner.github.io).


## DECISIONES TÉCNICAS

* Se utilizó Angular 17 con componentes standalone, evitando el uso innecesario de NgModules y simplificando la arquitectura de la aplicación.

* Se implementó Angular Signals para la gestión de estado, permitiendo un enfoque más simple, reactivo y eficiente en la actualización de la interfaz.

* Se aplicó una arquitectura modular basada en responsabilidades, organizada en capas:

  * `core/` → guards e interceptores
  * `features/` → funcionalidades principales (auth, productos) 
  * `shared/` → componentes reutilizables (layout, header)


### Separación de responsabilidades (componentes)

FEATURE → AUTH (Componentes, Models, Services, Route)
* `LoginPageComponent` → Autenticación

FEATURE → PRODUCTOS (Componentes, Models, Services, Route)

* `BandejaProductosComponent` → Manejo de lógica y estado de productos
* `GridBandejaProductosComponent` → Visualización de la tabla (p-table)
* `CrearEditarProductoComponent` → Gestión de formularios (crear / editar)
* `ModalDetalleProductoComponent` → Visualización de detalle
* `HeaderComponent` → Cabecera de la aplicación
* `MainLayoutComponent` → Layout principal


### Configuración de routing, Seguridad y autenticación

Se configuró el enrutamiento de la aplicación utilizando el Router de Angular.
Se definieron rutas por módulo funcional (auth, productos).
Se aplicó protección de rutas mediante guards:
  * `AuthGuard` → acceso solo a usuarios autenticados
  * `NoAuthGuard` → evita acceso al login si ya está autenticado
Se estructuró el uso de un layout principal (MainLayoutComponent) para encapsular las vistas protegidas.
Authorization: Bearer {token}
Este comportamiento se gestiona mediante un interceptor HTTP, permitiendo adjuntar automáticamente el token a todas las solicitudes protegidas.

### UI y experiencia de usuario

* Se utilizó **PrimeNG** para la construcción de la interfaz:

  * `p-table` → listado de productos
  * `p-dialog` → modales
  * `p-confirmDialog` → confirmaciones
  * `p-toast` → notificaciones
  * `p-card` → diseño y separaciones
  * `pButton` → acciones
  * `pInputText` → inputs


Esto permitió acelerar el desarrollo y mantener consistencia visual.


### Consumo de API

* Se utilizó la **Fake Store API** como backend simulado para operaciones CRUD.
* Se implementó un `ProductoService` para desacoplar la lógica de acceso a datos.
* Se implementó un `AuthService` para consumir el servicio de login.


### Manejo de estado en navegación

* Se utilizó el **Router state** para:

  * Reflejar cambios (crear / editar) en la tabla sin recargar datos desde la API
  * Mejorar la experiencia de usuario y rendimiento


### Pruebas unitarias

Se implementaron pruebas unitarias utilizando:

* **Jasmine**
* **Karma**
* **HttpClientTestingModule** (mock de servicios HTTP)

Cobertura aplicada en:

* Validación de formularios
* Filtrado de productos
* Eliminación de registros
* Emisión de eventos (`EventEmitter`)
* Lógica de creación y edición
* Simulación de servicios


## MEJORAS FUTURAS

* Implementar un **backend real** (Node.js, .NET, etc.) con persistencia en base de datos, ya que actualmente se utiliza Fake Store API (simulada).

* Incorporar un **manejo de estado global** (NgRx o Signal Store) para escalar la aplicación y centralizar la gestión de datos.

* Implementar **interceptores HTTP adicionales** para:

  * Manejo global de errores
  * Manejo automático de loaders
  * Renovación de tokens (refresh token)

* Mejorar la **seguridad de autenticación**:

  * Persistencia del token en almacenamiento seguro
  * Expiración y renovación de sesión
  * Protección adicional de rutas

* Optimizar la **experiencia de usuario (UX/UI)**:

  * Skeleton loaders
  * Paginación desde backend
  * Filtros avanzados
  * Manejo de estados vacíos

* Mejorar la **estructura de routing**:

  * Lazy loading por módulos funcionales
  * Preloading strategies para optimizar carga

* Incrementar la **cobertura de pruebas**:

  * Pruebas de integración
  * Pruebas end-to-end (Cypress o Playwright)
  * Medición de cobertura (coverage report)

* Implementar **logging y monitoreo**:

  * Registro de errores
  * Integración con herramientas como Sentry

* Preparar la aplicación para **despliegue en producción**:

  * Configuración de ambientes (dev, qa, prod)

