import ky from 'ky';
import { env } from '@/constants/app.config';

const { PREFIX_URL } = env;
export const instance = ky.extend({
  prefixUrl: PREFIX_URL,
  headers: {
    Accept: 'application/json',
  },
});
