# Chat-System

This is a Node.js/Express TypeScript project that implements a Chat and Subscription system using Prisma and PostgreSQL. It supports free-tier messaging, subscription bundles, and auto-renewal logic.

---

## Features

- **Chat Module**

  - Ask questions and receive mocked AI responses.
  - Free-tier messages per month (3 by default).
  - Deducts messages from subscriptions if free quota is exhausted.

- **Subscription Module**

  - Create subscription bundles: Basic, Pro, Enterprise.
  - Supports monthly or yearly billing cycles.
  - Auto-renew subscriptions and simulate payment failures.
  - Cancel subscriptions while preserving usage history.

- **Free Quota Management**

  - Resets free-tier quota monthly (cron job).
  - Can run every 5 minutes in development for testing.

- **Database**
  - PostgreSQL with Prisma ORM.
  - Entities: User, ChatMessage, Subscription, FreeQuota, BundleUsage.

---

## Prerequisites

- Node.js v20+
- PostgreSQL database
- npm or yarn

---

## Setup

1. **Clone the repository**

```bash
git clone <https://github.com/AliYusufzai/Ali-Raza-Khan.git>
cd chat-system
```

2. **Docker**
   Run docker command to download and run the postgress image

3. **Run NPM**
   npm install

## CREATE ENV FILE

- DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
- PORT=3000
- NODE_ENV=development

- npx prisma generate
- npx prisma migrate dev --name init
- npm run dev

## SEED User will be created if there is no user found in the user table and its id will be logged
