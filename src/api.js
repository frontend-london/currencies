export const get = (url, onError, onErrorParams) =>
  new Promise(
    (resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => onError(err))
    }
  )
