"use client";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NextAuthSessionProvider>
        {children}
      </NextAuthSessionProvider>
    </div>
  )
}

export default SessionProvider;
