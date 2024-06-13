import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { admin } from "@/firebaseAdmin";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      try {
        const customClaims = {
          email: token.email!,
        };
        const customToken = await admin.auth().createCustomToken(token.email!, customClaims);
        (session as any).customToken = customToken;
      } catch (error) {
        console.error("Error creating custom token:", error);
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
