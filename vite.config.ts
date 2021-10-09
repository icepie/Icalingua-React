import react from '@vitejs/plugin-react'
import { ConfigEnv, UserConfigExport } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

export default ({command}: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      react(),
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve',
      }),
    ],
    build: {
      target: ['esnext'],
    },
  }
}
