export function extractAddress(ipAddress?: string) {
  if (!ipAddress) {
    return '';
  }
  if (ipAddress && ipAddress.includes('::ffff:')) {
    return ipAddress.replace('::ffff:', '');
  }
  return ipAddress;
}
