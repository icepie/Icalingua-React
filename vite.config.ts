import { UserConfigExport, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { viteMockServe } from 'vite-plugin-mock';
import vitePluginImp from 'vite-plugin-imp';

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      react(),
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve',
      }),
      //vitePluginImp({
      //  libList: [
      //    {
      //      libName: "antd",
      //      style: (name) => `antd/lib/${name}/style/index.less`,
      //    },
      //  ],
      //})
    ],
  }
}
