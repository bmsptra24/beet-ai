'use server'
import {
  template,
  templateResetPassword,
} from '@/components/modules/email-verification/template'
import { generateCode } from './generateNumber'
import {
  prismaCreateVerification,
  prismaFindUniqueToken,
  prismaUpdateUser,
  prismaUpsertToken,
} from './prisma'
import nodemailer from 'nodemailer'
import { randomBytes } from 'crypto'

export const validation = async (
  user: any,
  credentials: Record<'password' | 'email' | 'csrfToken', string> | undefined,
) => {
  if (user === null) return false
  if (credentials?.csrfToken === null) return false
  if (user?.password !== credentials?.password) return false
  return true
}

export const sendCode = async (email: string) => {
  const code = generateCode()
  await prismaCreateVerification({
    data: { user: { connect: { email } }, code },
  })
  await sendEmail(email, code)
}

export const sendEmail = async (email: string, code: number) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      },
    })

    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Hi',
      html: template(code),
    })

    console.log('Message sent: %s', info.messageId)
  } catch (error) {
    throw error
  }
}

export const sendResetLink = async (email: string) => {
  try {
    const tokenLenght = 30
    const token = randomBytes(tokenLenght).toString('hex')

    // add token to db if token not already in db
    const response = await prismaFindUniqueToken({
      where: { resetPassword: token },
    })
    if (response) throw new Error('Fail to create token! Try again!')
    await prismaUpdateUser({
      where: { email },
      data: { Token: { create: { resetPassword: token } } },
    })

    // sent email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      },
    })

    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Hi',
      html: templateResetPassword(token),
    })

    console.log('Message sent: %s', info.messageId)
  } catch (error) {
    throw error
  }
}
