import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { database } from '../database';
import { anonymous } from 'better-auth/plugins';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
  names,
} from 'unique-names-generator';

export const auth = betterAuth({
  database: prismaAdapter(database, {
    provider: 'postgresql',
  }),
  plugins: [
    anonymous({
      emailDomainName: 'moezzat.com',
      generateName() {
        return uniqueNamesGenerator({
          dictionaries: [adjectives, colors, animals, names],
          separator: ' ',
          style: 'capital',
          length: 2,
        });
      },
    }),
    nextCookies(),
  ],
});
