export const baseurl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://beet-ai.vercel.app'
