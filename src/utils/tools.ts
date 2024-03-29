const randomUsernameColor = () => {
  const colors = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    // '#cddc39',
    // '#ffeb3b',
    // '#ffc107',
    '#ff9800',
    '#ff5722',
    // '#795548',
    // '#9e9e9e',
    // '#607d8b',
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}

function isObject(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

const mergeObject = (target: any, ...arg: any[]) => {
  if (!isObject(target)) {
    return target
  }

  if (arg.length === 0) {
    return target
  }

  const source = arg[0]

  if (isObject(source)) {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (isObject(source[key])) {
          if (!target[key]) {
            target[key] = {}
          }
          mergeObject(target[key], source[key])
        } else {
          target[key] = source[key]
        }
      }
    }
  }

  return target
}

export { randomUsernameColor, mergeObject }
