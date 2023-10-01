export const template = (code: number) => {
  return `Your code verification is ${code}`
}

export const templateResetPassword = (token: string) => {
  return `
  Click this link to reset your password!
  ${process.env.URL}/sign/reset/${token}

  If you won't reset your password account just ignore this message.
  `
}
