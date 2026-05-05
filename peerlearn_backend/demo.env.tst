# Environment variables declared in this file are NOT automatically loaded by Prisma.
# Please add `import "dotenv/config";` to your `prisma.config.ts` file, or use the Prisma CLI with Bun
# to load environment variables from .env files: https://pris.ly/prisma-config-env-vars.

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/peerlearn?schema=public"
PORT =5000
HASH_PASS_SALT_ROUNDS=13

ACCESS_T_SECRET=acctokensecretkey
ACCESS_T_EXP=59m
REFRESH_T_SECRET=reftokensecretkey
REFRESH_T_EXP=1d
FORGOT_TOKEN_SECRET=forgottokensecretkey
FORGOT_TOKEN_EXP=5m

BASE_EMAIL=piyasmahmudealif@gmail.com
FRONT_END_URL=http://localhost:5173/reset-password
APP_PASS=ggku bliu csno yelf
OPENAI_API_KEY=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