export default (vm, query) => {
  const newQuery = Object.assign({}, vm.$route.query, query)

  for (const queryKey in query) {
    if (query[queryKey] === '') {
      delete newQuery[queryKey]
    }
  }

  vm.$router.push({
    name: vm.$route.name,
    params: vm.$route.params,
    query: newQuery,
  })
}
