import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Website-resident exhibition build: this copy of the application is the
// curated public variant (the internal coverage view and its dataset are
// physically absent from the source). Output is served from /exhibition/.
export default defineConfig({
  plugins: [react()],
  base: '/exhibition/',
})
