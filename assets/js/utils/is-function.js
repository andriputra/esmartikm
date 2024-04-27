export default (fn) => {
  return fn && {}.toString.call(fn) === '[object Function]'
}
