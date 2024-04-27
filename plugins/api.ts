import { Plugin } from '@nuxt/types'
import PasswordForgot from '~/api/passwordForgot'
import PasswordReset from '~/api/passwordReset'
import Register from '~/api/register'
import Categories from '~/api/categories'
import Provinces from '~/api/provinces'
import Cities from '~/api/cities'
import Account from '~/api/account'
import Profile from '~/api/profile'
import Password from '~/api/password'
import Users from '~/api/users'
import UserCategories from '~/api/userCategories'
import Catalogs from '~/api/catalogs'
import Approvals from '~/api/approvals'
import Events from '~/api/events'
import Gallery from '~/api/gallery'
import Settings from '~/api/settings'
import EventRegister, { EventRegistration } from '~/api/eventRegister'
import EventUnregister, { EventUnregistration } from '~/api/eventUnregister'

export interface REST {
  query: (params?: object) => Promise<any>
  get: (id?: number | string) => Promise<any>
  post: (params?: object) => Promise<any>
  postUpload: (params?: object) => Promise<any>
  put: (id: number | string, params?: object) => Promise<any>
  putUpload: (id: number | string, params?: object) => Promise<any>
  delete: (id?: number | string) => Promise<any>
}

interface API {
  passwordForgot: REST
  passwordReset: REST
  register: REST
  categories: REST
  provinces: REST
  cities: REST
  account: REST
  profile: REST
  password: REST
  users: REST
  userCategories: REST
  catalogs: REST
  approvals: REST
  events: REST
  gallery: REST
  settings: REST
  eventRegister: REST & EventRegistration
  eventUnregister: REST & EventUnregistration
}

declare module 'vue/types/vue' {
  // this.$api inside Vue components
  interface Vue {
    $api: API
  }
}

declare module '@nuxt/types' {
  // nuxtapp.$api inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $api: API
  }

  // nuxt$api
  interface Context {
    $api: API
  }
}

declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $api: API
  }
}

const api: Plugin = ({ $axios }, inject) => {
  inject('api', {
    passwordForgot: new PasswordForgot($axios),
    passwordReset: new PasswordReset($axios),
    register: new Register($axios),
    categories: new Categories($axios),
    provinces: new Provinces($axios),
    cities: new Cities($axios),
    account: new Account($axios),
    profile: new Profile($axios),
    password: new Password($axios),
    users: new Users($axios),
    userCategories: new UserCategories($axios),
    catalogs: new Catalogs($axios),
    approvals: new Approvals($axios),
    events: new Events($axios),
    eventRegister: new EventRegister($axios),
    eventUnregister: new EventUnregister($axios),
    gallery: new Gallery($axios),
    settings: new Settings($axios),
  })
}

export default api
