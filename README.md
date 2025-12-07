# create-elysia-app

Create Elysia App is a CLI tool that scaffolds a new ElysiaJS (https://elysiajs.com/) project with all the necessary files and configurations: `package.json`, `bun.lock`, `tsconfig.json`, `.env`, `.gitignore`, and a starter `src` folder.

---

## Features

- Interactive CLI to name your project
- Copies a ready-made ElysiaJS template
- Installs all dependencies automatically (latest versions)
- Spinner + colored logs for a smooth developer experience

---

## Installation

### Using Bun

```bash
bun install -g create-elysia-app
## Using bunx (no global install)
bunx create-elysia-app
