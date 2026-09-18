# Next.js App Router Architecture: Accessible UI & State Management

This repository contains the solution for **FST Assignment 1**, focusing on modern UI engineering, responsive architecture, client-side state caching, and type-safe server mutations.

## 🚀 Features

- **Next.js App Router (v15)**: Leveraging React Server Components (RSC) to minimize client-side JavaScript overhead.
- **Accessible UI Primitives**: Styled with **Tailwind CSS**, constructed using **Radix UI** and **shadcn/ui**. Includes a hydration-safe Dark/Light mode toggle via `next-themes`.
- **Client State Caching**: Centralized, persistent Shopping Cart state utilizing **Zustand**, heavily optimized with atomic selectors to prevent cross-boundary layout re-renders.
- **End-to-End Type-Safety**: Form validation is handled seamlessly with **React Hook Form** and **Zod**. The identical Zod schema is reused in a **Server Action** for robust backend payload sanitization.
- **Optimistic UI**: Implements `useTransition` and `sonner` toasts for asynchronous loading skeletons and optimistic feedback.

## 🛠️ Tech Stack
- [Next.js (App Router)](https://nextjs.org)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Zod](https://zod.dev) & [React Hook Form](https://react-hook-form.com/)
- [shadcn/ui](https://ui.shadcn.com) & [Tailwind CSS](https://tailwindcss.com)

## 📦 Getting Started

First, install the dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Technical Report
Please refer to the `Technical_Report.md` in the root of this repository for an in-depth analysis of RSC boundaries, server vs. client state management, and the Lighthouse Web Vitals (LCP, CLS, INP) audit.
