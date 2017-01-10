import Home from 'components/home'
import Graphs from 'components/graphs'
import Reports from 'components/reports'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/graphs',
    name: 'graphs',
    component: Graphs
  },
  {
    path: '/reports',
    name: 'reports',
    component: Reports
  }
]

export default routes
