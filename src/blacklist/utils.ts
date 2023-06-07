export function extractAddress(ipAddress: string) {
  if (ipAddress.includes('::ffff:')) {
    return ipAddress.replace('::ffff:', '');
  }
  return ipAddress;
}
