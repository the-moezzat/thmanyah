import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      BETTER_AUTH_SECRET: z.string(),
    },
    client: {},
    runtimeEnv: {
      BETTER_AUTH_SECRET: process.env.CLERK_SECRET_KEY,
    },
  });
