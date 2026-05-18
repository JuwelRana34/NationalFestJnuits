<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Tech Stack & Environment
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Shadcn UI, Framer Motion
- **Backend API:** External Hono API
- **Deployment:** Cloudflare Pages via OpenNext (Always use OpenNext standards, not next-on-pages)

# API & Data Fetching Rules (Strict)
1. **NO Direct Database Access:** This is purely a frontend application. Do NOT write any SQL queries, Prisma, or Drizzle code.
2. **Use Custom Fetcher:** Always use the custom `honoFetch` utility located in the project to communicate with the backend. Do not use standard `fetch` or Axios unless explicitly told to.
3. **Type Safety:** Read the backend API response types (from `@api-contract` or `types/`) and apply them strictly to the `honoFetch` calls and component props.

# Next.js 16 Core Rules
1. **Async Params:** `searchParams` and `params` in Server Components, Layouts, and Actions are PROMISES. You MUST `await` them before reading their properties.
2. **Component Architecture:** Default to Server Components (RSC). Only use `"use client"` at the lowest possible leaf node (e.g., a button, form, or interactive Shadcn component).
3. **Data Fetching & Streaming:** Do NOT await slow API fetches at the top of a page layout. Wrap asynchronous data fetching components in a `<Suspense>` boundary to stream the UI shell immediately.
4. **Mutations:** Always use Next.js Server Actions to handle form submissions and trigger API mutations via `honoFetch`. Use `revalidatePath` to update the UI after a successful API call.

# Senior Developer Philosophy (Coding Style)
1. **Prioritize Readability:** Write boring, predictable, and simple code. Optimize for humans to read, not just machines to execute.
2. **KISS & YAGNI:** Keep It Simple, Stupid. You Aren't Gonna Need It. Do NOT over-engineer. Avoid premature abstractions, unnecessary generic wrappers, or overly complex design patterns.
3. **Guard Clauses:** Handle API errors and edge cases at the top of functions. Return early to avoid deep nesting (no arrow-shaped code).
4. **Descriptive Naming:** Use exact, self-documenting names for variables, types, and functions. Avoid vague terms like `data`, `obj`, `handleStuff`, or `val`.

# AI Workflow Instructions
- Always ask for clarification if the user provides a vague prompt.
- Work in chunks. Generate the UI shell/layout first, then API fetching logic, then interactivity.
- Check the `types/` folder to understand the API data structures before creating Shadcn tables or forms.
