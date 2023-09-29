'use client'
import React from 'react'
import { NextAuthProvider } from '@/app/providers'
import Box from './Box'
import Background from '@/components/modules/sign/Background'
import Link from 'next/link'
import { bricolageGrotesque, jost } from '@/styles/fonts'

const page = () => {
  return (
    <main className="min-h-screen justify-center lg:justify-start relative text-xl flex bg-primary-white lg:bg-primary-six">
      <NextAuthProvider>
        <Box />
      </NextAuthProvider>
      <Background />
    </main>
  )
}

export default page
