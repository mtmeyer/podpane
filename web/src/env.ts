import { object, string, optional, parse } from 'valibot';

const EnvSchema = object({
  VITE_SERVER_PORT: optional(string()),
});

const env = parse(EnvSchema, import.meta.env)

export default env
