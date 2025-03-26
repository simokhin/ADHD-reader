import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
  },
  // socialProviders: {
  //   discord: {
  //     clientId: process.env.DISCORD_CLIENT_ID,
  //     clientSecret: process.env.DISCORD_CLIENT_SECRET,
  //   },
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET,
  //   },
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //   },
  //   twitter: {
  //     clientId: process.env.TWITTER_CLIENT_ID,
  //     clientSecret: process.env.TWITTER_CLIENT_SECRET,
  //   },
  // },
});
