import { defineConfig } from 'prisma/config'

export default defineConfig({
  seed: {
    run: 'ts-node prisma/seed.ts',
  },
})
