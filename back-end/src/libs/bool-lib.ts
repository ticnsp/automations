export function convertStringToBool(stringToTest) {
  if (stringToTest === 'true') {
    return true;
  }
  if (stringToTest === 'false') {
    return false;
  }
  return stringToTest;
}