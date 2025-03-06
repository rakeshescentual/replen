
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'
import Index from '@/pages/Index'
import Settings from '@/pages/Settings'
import Documentation from '@/pages/Documentation'
import ValueComparison from '@/pages/ValueComparison'
import CustomerMyReplenishments from '@/pages/CustomerMyReplenishments'
import AISentimentAnalysis from '@/pages/AISentimentAnalysis'
import NotFound from '@/pages/NotFound'
import InternetDataAnalysis from '@/pages/InternetDataAnalysis'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/documentation',
    element: <Documentation />,
  },
  {
    path: '/value-comparison',
    element: <ValueComparison />,
  },
  {
    path: '/my-replenishments',
    element: <CustomerMyReplenishments />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/sentiment-analysis',
    element: <AISentimentAnalysis />,
  },
  {
    path: '/internet-data-analysis',
    element: <InternetDataAnalysis />,
  },
  {
    path: '*',
    element: <NotFound />,
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
