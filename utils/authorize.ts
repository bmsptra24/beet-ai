export const validation = async (
  user: any,
  credentials: Record<"password" | "email" | "csrfToken", string> | undefined
) => {
  if (user === null) return false;
  if (credentials?.csrfToken === null) return false;
  if (user?.password !== credentials?.password) return false;
  return true;
};
