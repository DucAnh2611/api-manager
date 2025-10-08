import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

const encodingStyle = 'hex';

export const generateBytes = (length: number, prefix?: string) => {
  return `${prefix ? `${prefix}_` : ''}${randomBytes(length).toString(encodingStyle)}`;
};

export const hash = (data: string, length: number, salt?: string) => {
  let saltFinal = salt;
  if (!saltFinal) {
    saltFinal = randomBytes(length).toString('hex');
  }

  const hashed = scryptSync(data, saltFinal, 64).toString(encodingStyle);
  return `${saltFinal}:${hashed}`;
};

export const verify = (data: string, storedHash: string) => {
  const [salt, key] = storedHash.split(':');

  const hashedBuffer = Buffer.from(
    scryptSync(data, salt, 64).toString(encodingStyle),
    encodingStyle
  );
  const keyBuffer = Buffer.from(key, encodingStyle);

  return timingSafeEqual(hashedBuffer, keyBuffer);
};
