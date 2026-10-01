import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import Nodemailer from "next-auth/providers/nodemailer";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
    Nodemailer({
      server: {
        host: "smtp-relay.brevo.com",
        port: 587,
        auth: {
          user: process.env.BREVO_SMTP_LOGIN!,   // your Brevo account email
          pass: process.env.BREVO_SMTP_KEY!,     // SMTP key from Brevo dashboard
        },
      },
      from: "JobAI <noreply@yourdomain.com>",
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/verify",
    error: "/verify?error=true",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // After login, check if onboarding is complete
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/dashboard`;
    },
  },
  session: { strategy: "jwt" },
});
