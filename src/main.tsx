import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
// 全局配置
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import './index.scss'
import router from './routes.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ConfigProvider locale={zhCN}>
        <RouterProvider router={router} />
    </ConfigProvider>
)
