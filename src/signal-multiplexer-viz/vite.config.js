import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// VITE_EXHIBITION=1 produces the curated public build:
//  - served under /exhibition/
//  - the Program Coverage view (and its internal dataset) is aliased to a stub
//    so coverage/gap-analysis data never enters the emitted bundle.
export default defineConfig(() => {
  const exhibition = process.env.VITE_EXHIBITION === '1'
  return {
    plugins: [react()],
    base: exhibition ? '/exhibition/' : '/',
    resolve: {
      alias: exhibition
        ? [
            {
              find: /^\.\/components\/ProgramCoverageMap$/,
              replacement: fileURLToPath(new URL('./src/components/ProgramCoverageMapStub.jsx', import.meta.url)),
            },
          ]
        : [],
    },
  }
})
