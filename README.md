This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Project Notes

### Specifications:

A separate, lightweight Front-end repo (your own)
Build a simple React app that shows an Orders table and basic CRUD using dummy data (no backend required).

Minimum features:
Orders table (id, customer, location, status, total, createdAt).
Create a new order; view, update, and delete existing orders.
One status filter (e.g., All/Pending/Active/Out For Delivery/Delivered/Canceled).
One search bar (search by order id or customer name is fine).
Use state management for app/UI data.
This is absolutely doable with dummy data—no API needed.

### Actions taken:

Created table with specified columns - partially reused previously owned/developed components for speed.

State/Logic: used local state and hooks for state management as scope of project was small and didnt need context or state management libraries like Redux...
Had preexisting logic that utilized useMemo for repeating searches and unnecessary renders.
Used useRef for generating new order id numbers (adds 1)

Clicking on header cells sorts columns in ascending/decending order.
Searches search through mock data's ids and cusomer names.

CRUD Operations:
Creating a new order can be done after clicking the New Order button and submitting the form.
Editing and deleting can be done through the action buttons at the end of each row.
Clicking delete triggers a browser confirm banner before effectively deleting.
