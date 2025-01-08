# DriveX - Panel de Administración 🚀

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query/latest)
[![i18next](https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white)](https://www.i18next.com/)

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Scripts Disponibles](#-scripts-disponibles)

## 🎯 Descripción General

DriveX es un panel de administración moderno desarrollado con Next.js y Material-UI, diseñado para ofrecer una experiencia de usuario excepcional en la gestión de datos y recursos. La aplicación implementa las mejores prácticas de desarrollo web moderno, incluyendo internacionalización, gestión de estado eficiente y una arquitectura escalable.

## ✨ Características

- **Interfaz Moderna con Material-UI**
  - Componentes MUI personalizados
  - Sistema de tema personalizable
  - Diseño responsivo para todos los dispositivos
  - Gráficos interactivos con MUI X-Charts

- **Arquitectura Avanzada**
  - Routing dinámico con Next.js App Router
  - Gestión de estado con React Query
  - Internacionalización completa (i18next)
  - Validación de formularios con React Hook Form y Zod

- **Características Técnicas**
  - TypeScript para seguridad de tipos
  - API REST con Axios
  - Sistema de caché optimizado
  - Manejo de estado global con Context API

## 🛠 Tecnologías Utilizadas

- **Framework y Core:**
  - Next.js 14.x
  - React 18.x
  - TypeScript 5.x

- **UI y Estilos:**
  - Material-UI (MUI) 6.x
  - MUI X-Charts
  - MUI X-Data-Grid
  - Emotion
  - Styled Components

- **Estado y Data Fetching:**
  - TanStack Query (React Query)
  - Axios

- **Formularios y Validación:**
  - React Hook Form
  - Zod

- **Internacionalización:**
  - i18next
  - react-i18next

- **Herramientas de Desarrollo:**
  - ESLint
  - Husky
  - JSON Server (mock API)

## 📦 Requisitos Previos

- Node.js (versión LTS recomendada)
- npm o yarn
- Git

## 🚀 Instalación y Configuración

1. **Clonar el repositorio**
   ```bash
   git clone [https://github.com/xXAreizaXx/DriveX]
   cd drivex
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**
   ```
   NEXT_PUBLIC_API_URL=https://drivex-api.onrender.com
   ```

4. **Iniciar el servidor de desarrollo y mock API**
   ```bash
   # Terminal 1 - Servidor de desarrollo
   npm run dev

   # Terminal 2 - Mock API
   npm run server
   ```

## 📁 Estructura del Proyecto

```
src/
├── app/                # App Router de Next.js
├── components/         # Componentes reutilizables
├── constants/         # Constantes y configuraciones
├── contexts/          # Context API
├── hooks/             # Custom hooks
├── layouts/           # Componentes de layout
├── locales/           # Archivos de internacionalización
├── providers/         # Providers de la aplicación
├── services/          # Servicios y API calls
├── types/             # Definiciones de TypeScript
└── utils/             # Utilidades y helpers
```

## 📜 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter
- `npm run server` - Inicia el servidor mock API

Desarrollado con ❤️ por [Jorge Areiza](https://github.com/xXAreizaXx).
