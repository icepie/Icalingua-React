import { ArgsProps } from 'antd/lib/notification'

export const logger = {
  info: (args: ArgsProps) => {
    console.info(`Info: ${args.message ? `[${args.message}] ` : ''}${args.description}`)
  },
  success: (args: ArgsProps) => {
    console.info(`Success: ${args.message ? `[${args.message}] ` : ''}${args.description}`)
  },
  warning: (args: ArgsProps) => {
    console.warn(`Warning: ${args.message ? `[${args.message}] ` : ''}${args.description}`)
  },
  error: (args: ArgsProps) => {
    console.error(`Error: ${args.message ? `[${args.message}] ` : ''}${args.description}`)
  },
}

export function newLogProps(message: string, title = '') {
  let retProps: ArgsProps
  retProps = { description: message, message: title }
  return retProps
}
