<template>
  <div class="pb-20 lg:pb-0">
    <div class="top-bar-wrapper">
      <div class="container top-bar">
        <img src="~/assets/img/logo-kemenperin.png" class="mr-2.5" />
        <img src="~/assets/img/logomenperin.png" />
        <img src="~/assets/img/logo-esmart.jpg" />
        <nav class="lg:flex-1 flex">
          <ul class="navigation">
            <li class="navigation__item">
              <nuxt-link to="/" class="navigation__item__home">
                <svg-icon name="home" class="lg:hidden" />{{ $t('Home') }}
              </nuxt-link>
            </li>
            <dropdown
              v-if="$auth.loggedIn && $auth.user.role_id !== 2"
              class="navigation__item"
              tag-name="li"
              menu
            >
              <nuxt-link slot="toggle" to="/users">
                <svg-icon name="manage_accounts" class="lg:hidden" />{{
                  $t('Manage')
                }}
              </nuxt-link>
              <dropdown-menu-item>
                <nuxt-link to="/users">
                  <svg-icon name="people_alt" />{{ $t('Users') }}
                </nuxt-link>
                <nuxt-link to="/users/approvals">
                  <svg-icon name="update" />{{ $t('Request Update') }}
                </nuxt-link>
                <nuxt-link to="/events">
                  <svg-icon name="event" />{{ $t('Events') }}
                </nuxt-link>
                <nuxt-link to="/gallery">
                  <svg-icon name="photo_library" />{{ $t('Gallery') }}
                </nuxt-link>
                <nuxt-link to="/settings">
                  <svg-icon name="settings" />{{ $t('Settings') }}
                </nuxt-link>
              </dropdown-menu-item>
            </dropdown>
            <dropdown
              v-if="$auth.loggedIn"
              class="navigation__item"
              tag-name="li"
              menu
            >
              <nuxt-link slot="toggle" to="/user">
                <svg-icon name="account_circle" class="lg:hidden" />{{
                  $t('Profile')
                }}
              </nuxt-link>
              <dropdown-menu-item>
                <nuxt-link to="/user/account">
                  <svg-icon name="settings" />{{ $t('Account Settings') }}
                </nuxt-link>
                <nuxt-link to="/logout">
                  <svg-icon name="logout" />{{ $t('Logout') }}
                </nuxt-link>
              </dropdown-menu-item>
            </dropdown>
            <li v-else class="navigation__item">
              <nuxt-link to="/login">
                <svg-icon name="login" class="lg:hidden" />{{ $t('Login') }}
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <img src="~/assets/img/logo-bbi.jpg" />
        <img src="~/assets/img/logontb.png" />
      </div>
    </div>
    <Nuxt />
    <div class="footer-wrapper">
      <!-- <div class="absolute inset-0 z-10">
        <img
          src="~/assets/img/footer-left.png"
          class="absolute left-0 bottom-0 h-[125%]"
        />
        <img
          src="~/assets/img/footer-right.png"
          class="absolute bottom-[33%] left-[75%] w-1/4"
        />
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import Dropdown from '~/components/Dropdown.vue'
import DropdownMenuItem from '~/components/DropdownMenuItem.vue'

export default Vue.extend({
  components: { Dropdown, DropdownMenuItem },
  middleware: 'auth',
  computed: {
    ...mapState('events/active', { activeEvents: 'events' }),
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const doc = document.documentElement
      const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
      if (top > 0) {
        document.body.classList.add('scrolled')
      } else {
        document.body.classList.remove('scrolled')
      }
    },
  },
})
</script>
