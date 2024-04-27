import { Middleware } from '@nuxt/types'

const AdminMiddleware: Middleware = ({ $auth, redirect }) => {
  const user: any = $auth.user
  if (user.role_id === 2) {
    return redirect('/')
  }
}

export default AdminMiddleware
