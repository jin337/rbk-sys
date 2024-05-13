import { createBrowserRouter } from 'react-router-dom';

import Index from './views/Index';
import Swiper from './pages/Swiper';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    children: [
      {
        path: '/swiper',
        element: <Swiper />
      }
    ]
  }
])

export default router
