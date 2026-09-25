/*
1. Next.js App Router — Recommended Structure

What is layout.tsx in Next.js App Router?

layout.tsx is a special file in the Next.js App Router used to create a shared UI around multiple pages.
A layout wraps child pages and remains mounted while you navigate between those pages.

app/layout.tsx is the root layout, so it can contain common elements like:

 - Header
 - Navigation
 - Footer
 - Providers
 - Global styles
 - Authentication context

my-next-app/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   │
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── settings/
│   │       └── page.tsx
│   │
│   ├── users/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   └── api/
│       └── users/
│           └── route.ts
│
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Header.tsx
│   │   └── Modal.tsx
│   │
│   ├── users/
│   │   ├── UserList.tsx
│   │   └── UserCard.tsx
│   │
│   └── dashboard/
│       └── DashboardCard.tsx
│
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   └── db.ts
│
├── services/
│   ├── userService.ts
│   └── authService.ts
│
├── hooks/
│   ├── useAuth.ts
│   └── useDebounce.ts
│
├── store/
│   ├── index.ts
│   └── userSlice.ts
│
├── types/
│   ├── user.ts
│   └── api.ts
│
├── utils/
│   ├── validation.ts
│   └── formatDate.ts
│
├── public/
│   ├── images/
│   └── icons/
│
├── middleware.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── .env.local
*/

/*
2. Next.js Pages Router — Recommended Structure

What is _app.tsx in Next.js?

_app.tsx is a special file in the Next.js Pages Router. It acts as a top-level wrapper around all pages in the pages/ directory.

Think of it as the Pages Router equivalent of the root layout.tsx in the App Router, although they are not exactly the same.

_document.tsx - 
_document.tsx is a special file in the Next.js Pages Router used to customize the overall HTML document structure. It allows us to customize the <html>, <head>, and <body> elements using Next.js components such as Html, Head, Main, and NextScript. Unlike _app.tsx, it is not used for application state, providers, or page-level logic. In the App Router, this responsibility is largely handled by the root app/layout.tsx.

my-next-app/
│
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   ├── 404.tsx
│   ├── 500.tsx
│   │
│   ├── login.tsx
│   │
│   ├── dashboard/
│   │   ├── index.tsx
│   │   └── settings.tsx
│   │
│   ├── users/
│   │   ├── index.tsx
│   │   └── [id].tsx
│   │
│   └── api/
│       └── users.ts
│
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Header.tsx
│   │   └── Modal.tsx
│   │
│   ├── users/
│   │   ├── UserList.tsx
│   │   └── UserCard.tsx
│   │
│   └── dashboard/
│       └── DashboardCard.tsx
│
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   └── db.ts
│
├── services/
│   ├── userService.ts
│   └── authService.ts
│
├── hooks/
│   ├── useAuth.ts
│   └── useDebounce.ts
│
├── store/
│   ├── index.ts
│   └── userSlice.ts
│
├── types/
│   ├── user.ts
│   └── api.ts
│
├── utils/
│   ├── validation.ts
│   └── formatDate.ts
│
├── public/
│   ├── images/
│   └── icons/
│
├── middleware.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── .env.local
*/
