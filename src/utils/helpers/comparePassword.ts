import * as bcrypt from 'bcrypt';

export async function comparePassword(password: string, hasPassword: string) {
  const ComparePasswordResult = await bcrypt.compare(password, hasPassword);
  return ComparePasswordResult;
}
