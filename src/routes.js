const Foo = { template: '<div>foo</div>' }
import Home from 'components/home'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '*',
    component: Foo
  }
]

export default routes
