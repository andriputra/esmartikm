<template>
  <div>Logging out...</div>
</template>

<script>
export default {
  beforeRouteEnter(_to, _from, next) {
    next(async (vm) => {
      await vm.$auth.logout()
      vm.$router.push('/login')
    })
  },
}
</script>
