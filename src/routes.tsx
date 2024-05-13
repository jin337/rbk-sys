import { createBrowserRouter } from 'react-router-dom';

import Index from './views/Index';
import Swiper from './pages/Swiper';
import Category from './pages/Category';
import Order from './pages/Order';
import Member from './pages/Member';
import Goods from './pages/Goods';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    children: [
      {
        path: '/member',
        element: <Member />
      },
      {
        path: '/order',
        element: <Order />
      },
      {
        path: '/category',
        element: <Category />
      },
      {
        path: '/goods',
        element: <Goods />
      },
      {
        path: '/swiper',
        element: <Swiper />
      },
    ]
  }
])

export default router
