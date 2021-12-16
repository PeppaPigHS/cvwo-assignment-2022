export const getCSRFToken = () => {
  const metas = document.getElementsByTagName('meta')

  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('name') === 'csrf-token') {
      return metas[i].getAttribute('content')
    }
  }

  return ''
}
