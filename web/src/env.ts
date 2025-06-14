import { object, string, parse } from 'valibot';

const EnvSchema = object({
  VITE_API_URL: string(),
});

const env = parse(EnvSchema, import.meta.env)

export default env
