import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import Email from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
    Email({
      server: "smtp://localhost:25",  // dummy — real sending uses Brevo HTTP API below
      from: "JobHuntPro <ankitloomba156@gmail.com>",
      sendVerificationRequest: async ({ identifier: email, url }) => {
        const res = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": process.env.BREVO_API_KEY!,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            sender: { name: "JobHuntPro", email: "ankitloomba156@gmail.com" },
            to: [{ email }],
            subject: "Sign in to JobHuntPro",
            htmlContent: `
              <div style="font-family:sans-serif;max-width:480px;margin:0 auto">
                <h2 style="color:#2563EB">Sign in to JobHuntPro</h2>
                <p>Click the button below to sign in. This link expires in 10 minutes.</p>
                <a href="${url}" style="display:inline-block;background:#2563EB;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin:16px 0">
                  Sign in to JobHuntPro
                </a>
                <p style="color:#888;font-size:13px">If you didn't request this, you can ignore this email.</p>
              </div>
            `,
          }),
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Brevo API error: ${res.status} ${text}`);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/verify",
    error: "/login?error=true",
  },
  callbacks: {
    async session({ session, user }) {
      if (user?.id) session.user.id = user.id;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/dashboard`;
    },
  },
  session: { strategy: "database" },
});
