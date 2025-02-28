export function checkExpiry(expiryDate: Date) {
  const exprired = expiryDate.getTime() - Date.now() >= 0;
  return exprired;
}
