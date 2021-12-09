export const logger = {
  info: (args: any) => {
    // console.info(`Info: ${args.message ? `[${args.message}] ` : ''}${args.description}`)
  },
  success: (args: any) => {
    // console.info(`Success: ${args.message ? `[${args.message}] ` : ''}${args.description}`)
  },
  warning: (args: any) => {
    // console.warn(`Warning: ${args.message ? `[${args.message}] ` : ''}${args.description}`)
  },
  error: (args: any) => {
    // console.error(`Error: ${args.message ? `[${args.message}] ` : ''}${args.description}`)
  },
}

export function newLogProps(message: string, title = '') {
  // const retProps = { description: message, message: title }
  // return retProps
}
