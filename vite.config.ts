import react from '@vitejs/plugin-react'
// @ts-ignore
import path from 'path'
import { ConfigEnv, UserConfigExport } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

export default ({ command }: ConfigEnv): UserConfigExport => {
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
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
        adapters: path.resolve(__dirname, './src/adapters'),
        app: path.resolve(__dirname, './src/app'),
        assets: path.resolve(__dirname, './src/assets'),
        components: path.resolve(__dirname, './src/components'),
        providers: path.resolve(__dirname, './src/providers'),
        styles: path.resolve(__dirname, './src/styles'),
        types: path.resolve(__dirname, './src/providers'),
        utils: path.resolve(__dirname, './src/utils'),
        views: path.resolve(__dirname, './src/views'),
      },
    },
  }
}
