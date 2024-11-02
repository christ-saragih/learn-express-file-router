/**
 * @description Fill parameters in a template string, e.g. `Hello, {{name}}!` with `{ name: 'John' }` will return `Hello, John!`
 */
export const fillParameters = (template: string, param: Record<string, any>): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => param[key] || match);
};

export const newLineToBr = (text: string): string => {
  return text.replace(/\n/g, '<br>');
};

export const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const random = '7fc5c02e-6e53-4786-8f4a-68c7c8c53fd4';

export const encryptRequestValidation = (requestId: number, validator: string): string => {
  return Buffer.from(`${requestId}-${validator}${random}`).toString('base64');
};

export const decryptRequestValidation = (
  encrypted: string
): { requestId: number; validator: string } => {
  const decrypted = Buffer.from(encrypted, 'base64').toString('utf8');
  const [requestId, validator] = decrypted.split('-');
  return { requestId: parseInt(requestId), validator: validator.substring(0, 5) };
};

export const transformEmployeeCode = (code: string, length: 4 | 5 = 5) => {
  if (code.length === length) return code;
  const zeroes = length - code.length;
  return '0'.repeat(zeroes) + code;
};
