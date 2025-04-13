# 📄 Review Screen App Documentation

## 🧭 Overview

**Review Screen App** is a modern React application built for **document review**. It allows users to view documents, select specific sections, and perform interactive operations on them.

---

## 🛠️ Tech Stack

### ⚙️ Core Technologies

- **React 19** – Modern UI library for building user interfaces
- **TypeScript** – Static typing for better developer experience
- **Vite** – Fast build tool and development server

### 🎨 UI Components and Styling

- **Tailwind CSS** – Utility-first CSS framework
- **Radix UI** – Unstyled, accessible UI primitives:
  - Alert Dialog
  - Checkbox
  - Dropdown Menu
  - Slot
- **class-variance-authority** – For building variant-based component APIs
- **clsx** & **tailwind-merge** – Conditional class name composition
- **Lucide React** – Icon library
- **Sonner** – Toast notification system

### 🧰 Development Tools

- **ESLint** – Linting for consistent code style
- **TypeScript ESLint** – TypeScript-specific lint rules

---

## 📁 Project Structure

```
src/
├── assets/
├── components/
│   ├── common/
│   ├── ui/
├── constants/
├── data/
│   ├── pages/
├── enums/
├── hooks/
├── language/
├── lib/
├── pages/
│   ├── pageNotFound/
│   └── review/
│       ├── components/
│       │   ├── documentPreview/
│       │   └── reviewSidebar/
│       └── hooks/
├── type/
├── utils/

```

---

## 🧩 Utility Functions

### 🎨 Color Utilities

- Generates a palette of `n` visually distinct colors
- Based on the **golden ratio**
- Customizable: lightness, opacity, and saturation

### 🧱 DOM Utilities

- Generates **consistent element IDs** using a prefix + unique ID

### ✂️ String Utilities

- Creates **acronyms** from strings
- Optional word limit and formatting

### 💾 LocalStorage Utilities

- **Type-safe** operations
- Handles serialization and deserialization

---

## 🪝 Custom Hooks

### `useTheme`

- Manages **light, dark, or system** themes
- Persists preference in `localStorage`
- Responds to system theme changes

### `useSection`

Handles section logic, including:

- Section removal
- Selection toggling (individual and bulk)
- Managing selected section data

---

## 🚀 Getting Started

### 📌 Prerequisites

- Node.js (latest LTS recommended)
- `npm`, `yarn`, or `pnpm`

### 🔧 Installation

```bash
git clone https://github.com/your-username/review-screen-app.git
cd review-screen-app
npm install
```

### 🛠️ Development

```bash
npm run dev
```

### 📦 Building for Production

```bash
npm run build
```

---

## ✨ Features

- 📄 Document preview with **zoom** support
- 🖍️ Section **selection** and **highlighting**
- 🧠 Smart section **management tools**
- 🌗 Theme switching (**light**, **dark**, **system**)
- 📱 Fully **responsive layout**

---

## 📜 License

_Include your license info here, e.g., MIT License_

```
MIT License

Copyright (c) 2025

```
