

## About the Project
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Dependencies (Packages)
- [Prisma](https://www.prisma.io/)

### Steps to create
1. First, the following script was entered into the terminal to setup the project
```bash
npx create-next-app@latest nextjs-crud-api --typescript
```

2. Install Prisma dependency
```bash
npm install prisma @prisma/client
npx prisma init --datasource-provider sqlite
```

3. Setup Prisma models in `prisma/schema.prisma`. Models in prisma represent the tables in your database. 
- This file would configure the database using the parameters set in the datasource object. 
- The generator object defines the code that would be generated to query your db. 
- The model objects define the tables to be created in the db and their Schemas. `Post` has been added as an example
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  createdAt DateTime @default(now())
}
```

4. Run scripts:
```bash
npx prisma db push
npx prisma generate
```

### Folder Structure
```pgsql
src/
├── app/
│   └── api/
|       ├── auth/
|       |   ├── login/
|       |   |   └── route.ts
|       |   └── register/
|       |       └── route.ts
│       └── posts/
│           ├── route.ts        ← [POST, GET]
│           └── [id]/
│               └── route.ts    ← [GET, PUT, DELETE]
├── lib/
│   ├── prisma.ts               ← Prisma client
|   └── auth.ts                 ← JWT helpers for auth
├── services/
│   └── postService.ts          ← Business logic
├── types/
│   └── post.ts                 ← Types/interfaces
```
For every new endpoint you add to the api, ensure that you add:
- A model to the `prisma/schema.prisma` file defining the database table structure
- A type/interface to the `types` folder to determine structure
- A service to the `services` folder containing functions to manipulate the data using prisma
- The routes to the `app/api` folder to enable the frontend call send data to the endpoint

### Authentication
1. Install dependencies (NextAuth, Prisma client and Auth/prisma-adapter)
```bash
npm install next-auth @prisma/client @auth/prisma-adapter bcryptjs jsonwebtoken @types/jsonwebtoken
```
- `next-auth` → the got-to auth solution for Next.js
- `bcryptjs` → for securely hashing passwords
- `jsonwebtoken` → for issuing login tokens
- `@types/jsonwebtoken` → makes jsonwebtoken import compatible with typescript

2. Ensure User db table schema in `prisma/schema.prisma` is correct and run 
```bash
npx prisma db push
```

3. Create auth utilities in `src/lib/auth.ts` and add functions to 
- signToken
- verifyToken
- requireAuth

4. Define `JWT_SECRET` in `.env` file.
You can generate a random key by any means of getting a random string or by running the following script
```bash
openssl rand -base64 32
``` 

5. Add routes for `Register` and `Login` and handle requests

6. Call `requireAuth` utility function at the top of every function that requires authentication


## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
