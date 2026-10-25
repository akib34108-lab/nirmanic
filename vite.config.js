import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { randomUUID } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const buildId = randomUUID()

function appVersionPlugin() {
  let command
  let versionFile

  return {
    name: 'nirmanic-app-version',
    configResolved(config) {
      command = config.command
      versionFile = resolve(config.root, config.build.outDir, 'version.json')
    },
    configureServer(server) {
      server.middlewares.use('/version.json', (request, response, next) => {
        if (request.method !== 'GET' && request.method !== 'HEAD') {
          next()
          return
        }
        response.setHeader('Content-Type', 'application/json')
        response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')
        response.end(JSON.stringify({ buildId }))
      })
    },
    async closeBundle() {
      if (command !== 'build') {
        return
      }
      await mkdir(dirname(versionFile), { recursive: true })
      await writeFile(versionFile, `${JSON.stringify({ buildId })}\n`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VITE_APP_BUILD_ID': JSON.stringify(buildId),
  },
  plugins: [react(), appVersionPlugin()],
})
