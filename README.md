# 🏟️ Spotter — App de Reservas Deportivas

**Spotter** es una aplicación móvil desarrollada con **Expo (React Native)** que permite a los usuarios **buscar, reservar y gestionar canchas deportivas** de distintos tipos (fútbol, pádel, tenis, golf, etc.).  
Está conectada a **Supabase** para autenticación, base de datos y almacenamiento de imágenes.

---

## 📱 Características principales

### 👤 Para clientes:
- Registro e inicio de sesión con **Supabase Auth** (email o redes sociales).  
- Exploración de canchas por **ubicación, tipo de deporte, fecha y horario**.  
- Visualización de disponibilidad en tiempo real.  
- Creación, modificación y cancelación de reservas.  
- Notificaciones de confirmación y actualizaciones de estado.  
- Subida de imágenes de perfil y gestión de cuenta.  

---

## 🧩 Arquitectura del proyecto

```
/src
├── api/                # Servicios para conexión con Supabase
├── components/         # Componentes reutilizables (botones, inputs, cards, etc.)
├── screens/            # Pantallas principales (Login, Home, Search, Booking, Profile)
├── store/              # Estado global (Zustand o Context)
├── utils/              # Helpers y funciones comunes
├── navigation/         # Navegación con react-navigation
├── assets/             # Íconos, imágenes, fuentes
└── App.tsx             # Punto de entrada principal
```

---

## ⚙️ Tecnologías utilizadas

| Área | Tecnología |
|------|-------------|
| Framework | [Expo](https://expo.dev) (React Native) |
| Backend | [Supabase](https://supabase.com) |
| Lenguaje | TypeScript |
| Estado global | Zustand / React Context |
| Navegación | React Navigation |
| Formularios | React Hook Form |
| Estilos | Styled Components / Tailwind RN |
| Notificaciones | Expo Notifications |
| Mapa y ubicación | React Native Maps / Expo Location |

---

---

## 📁 Estructura de carpetas

```
├─ src/
│   ├─ api/                 # Lógica de interacción con backend (fetch, axios, endpoints)
│   ├─ components/          # Componentes UI reutilizables, organizados según Atomic Design
│   │   ├─ atoms/           # Ej: Button.tsx, Input.tsx, Text.tsx
│   │   ├─ molecules/       # Ej: FormField.tsx (Input + Label + Error), UserAvatarWithName.tsx
│   │   ├─ organisms/       # Ej: HeaderNav.tsx, CardList.tsx, SidebarMenu.tsx
│   │   └─ templates/       # Ej: AuthTemplate.tsx, DashboardTemplate.tsx
│   ├─ screens/             # Pantallas de la app (cada una puede usar templates/organisms/molecules)
│   │   ├─ HomeScreen.tsx
│   │   ├─ LoginScreen.tsx
│   │   └─ …
│   ├─ hooks/               # Custom React hooks (useAuth, useFetchData, useTheme…)
│   ├─ store/               # Estado global (Redux, Zustand, Context API…)
│   ├─ theme/               # Variables de tema: colores, tipografías, espaciados, etc.
│   ├─ utils/               # Helpers puros / funciones de utilidad / constantes reutilizables
│   └─ App.tsx              # Punto de entrada de la aplicación
│
├─ app.json / app.config.js  # Configuración de Expo
├─ package.json
└─ tsconfig.json
```

---

## 🧬 Aplicación de Atomic Design en tu proyecto

La metodología Atomic Design propone 5 niveles para construir UI escalables y consistentes: átomos, moléculas, organismos, plantillas y páginas. ([uifrommars.com](https://www.uifrommars.com/atomic-design-ventajas/))

### Nivel 1: Átomos

Estos son los bloques más pequeños de la interfaz. En tu proyecto puedes considerar como átomos:

* Botones (`Button`)
* Inputs (`Input`)
* Texto (`Text`)
* Iconos
* Colores, tipografías, espaciados definidos en `theme/`
  Estos componentes **no dependen de otros componentes complejos**. Son puros, reutilizables y con estado mínimo o ninguno.

### Nivel 2: Moléculas

Una molécula combina dos o más átomos. Ejemplos en tu proyecto:

* Un campo de formulario que consiste en un `Label` + `Input` + `ErrorText`
* Un avatar con nombre y ubicación: `Avatar` (átomo) + `Text` (átomo)
* Un botón con icono: `Icon` (átomo) + `Button` (átomo)
  Estas moléculas se agrupan en `components/molecules/`.

### Nivel 3: Organismos

Los organismos son grupos más complejos de UI que combinan moléculas (y/o átomos) para formar secciones de interfaz reutilizables. Ejemplos:

* Barra de navegación: logo + nav links + menú hamburguesa
* Tarjeta de producto: imagen (átomo) + título (átomo) + descripción (átomo) + botón “Comprar” (átomo) → todo dentro de un organismo `ProductCard`
* Footer de página, sección de comentarios, etc.
  Estos van en `components/organisms/`.

### Nivel 4: Plantillas

Las plantillas (templates) definen la estructura de una página utilizando organismos, moléculas y átomos, pero aún sin contenido final o datos dinámicos completos. Son el “esqueleto” de la UI. Por ejemplo:

* `AuthTemplate.tsx` que tiene header, formulario de login, pie de página
* `DashboardTemplate.tsx` con sidebar, barra de herramientas, panel de contenido
  Estos se ubican en `components/templates/`.

### Nivel 5: Páginas

Las páginas son instancias concretas de plantillas con datos reales, contenido final y completamente renderizadas. Ejemplos:

* `HomeScreen.tsx` es una página que utiliza `DashboardTemplate` + pasa datos reales (por ejemplo lista de productos)
* `LoginScreen.tsx` es una página que utiliza `AuthTemplate` y funciones de login reales
  Estas están en `src/screens/`.

---

## ✅ Ventajas de usar Atomic Design

* Aporta **consistencia** en diseño y desarrollo: los estilos, componentes y comportamiento se reutilizan y no se reinventan por pantalla. ([uifrommars.com](https://www.uifrommars.com/atomic-design-ventajas/))
* Facilita **escalar** la aplicación: al estar cada parte dividida, añadir nuevas funcionalidades es más rápido. ([uifrommars.com](https://www.uifrommars.com/atomic-design-ventajas/))
* Mejora la **colaboración** entre diseñadores y desarrolladores: hay un lenguaje común de componentes atómicos.
* Permite mantener una **guía de estilo** viva: tipografías, paleta de colores, espaciados ya forman parte del sistema (nivel átomo). ([uifrommars.com](https://www.uifrommars.com/atomic-design-ventajas/))
* Mejora la mantenibilidad: los cambios en un átomo se reflejan en todas las moléculas/organismos que lo usan, reduciendo duplicación de código.

---

## 🛠 Consejos de implementación

* Mantén los archivos de átomos realmente simples: sin lógica de negocio, sin datos dinámicos complejos.
* Usa TypeScript para reforzar los tipos de props de los componentes atómicos/moleculares.
* Organiza los componentes en carpetas por nivel atómico (como sugerido arriba) para mayor claridad.
* Documenta tus componentes (por ejemplo con Storybook) para que todos sepan qué átomos/moléculas existen y cómo usarlos.
* Evita que los componentes “se salten” niveles: un componente de nivel plantilla no debería modificarse directamente como un átomo en una pantalla sin pasar por la plantilla.
* Usa tests para los componentes críticos, especialmente los átomos y moléculas, para garantizar que su comportamiento se mantiene estable.

---

## 🧩 Cómo encaja con tu app

Dado que tu app usa Expo + React Native, puedes adaptar:

* `components/atoms/Button.tsx` → un botón reutilizable para móvil.
* `components/molecules/FormField.tsx` → combinando Label + Input + Error.
* `components/organisms/HeaderNav.tsx` → la cabecera de la app.
* `components/templates/DashboardTemplate.tsx` → estructura con sidebar y contenido.
* `screens/HomeScreen.tsx` → la pantalla concreta usando `DashboardTemplate` y pasando datos reales desde `store/` o `api/`.

Así tendrás una arquitectura **limpia**, **modular** y preparada para crecer.

---

## 📚 Referencias

* “Atomic Design: qué es y qué ventajas tiene” – uiFromMars. ([uifrommars.com](https://www.uifrommars.com/atomic-design-ventajas/))
* Brad Frost – autor del enfoque Atomic Design. ([uifrommars.com](https://www.uifrommars.com/atomic-design-ventajas/))


## 🚀 Instalación y configuración

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tuusuario/spotter-app.git
cd spotter-app
```

### 2️⃣ Instalar dependencias
```bash
npm install
# o
yarn install
```

### 3️⃣ Configurar Supabase
Crea un archivo `.env` en la raíz del proyecto con tus credenciales de Supabase:

```env
EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon
```

### 4️⃣ Iniciar la app
```bash
npx expo start
```

Escaneá el QR con la app de **Expo Go** o corré en un emulador Android/iOS.

---

## 📆 Roadmap

- [x] Autenticación con Supabase  
- [x] Listado de canchas disponibles  
- [x] Sistema de reservas básicas  
- [ ] Notificaciones push en tiempo real  
- [ ] Pagos integrados (Mercado Pago / Stripe)  
- [ ] Perfil de usuario con historial de reservas  
- [ ] Mapa interactivo de complejos deportivos  
- [ ] Soporte para múltiples deportes  
- [ ] Multilenguaje (Español / Inglés)  

---

## 🧠 Próximos pasos

- Implementar el **dashboard web para dueños** (Next.js + Supabase).  
- Añadir **actualizaciones en tiempo real** con Supabase Realtime.  
- Mejorar la experiencia visual y agregar **tema oscuro**.  
- Publicar el **MVP** en **Expo Store**, **TestFlight** y **Play Store**.  

---

## 🧑‍💻 Contribución

¡Las contribuciones son bienvenidas!  
Podés abrir un *issue* o enviar un *pull request* con nuevas funcionalidades o correcciones.

---

## 📜 Licencia

MIT © 2025 — Creado por **David**  
Proyecto desarrollado con ❤️ usando [Expo](https://expo.dev) y [Supabase](https://supabase.com)
