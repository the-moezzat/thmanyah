import { keys as database } from '@repo/database/keys.js';
import { createEnv } from '@t3-oss/env-core';

export const env = createEnv({
  extends: [database()],
  server: {},
  runtimeEnv: {},
});
