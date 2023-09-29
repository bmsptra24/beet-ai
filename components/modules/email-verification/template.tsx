import { randomBytes } from 'crypto'

export const template = (code: number) => {
  return `Your code verification is ${code}`
}

export const templateResetPassword = () => {
  const tokenLenght = 20
  const token = randomBytes(tokenLenght).toString('hex')
  return `
  Click this link to reset your password!
  ${process.env.URL}/sign/reset/${token}

  If you won't reset your password account just ignore this message.
  `
}
