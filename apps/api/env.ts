import { keys as database } from '@repo/database/keys';
import { createEnv } from '@t3-oss/env-nextjs';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const env = createEnv({
  extends: [database()],
  server: {},
  client: {},
  runtimeEnv: {},
});
