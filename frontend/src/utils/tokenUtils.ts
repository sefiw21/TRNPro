let currentAccessToken: string | undefined = undefined;
export const setAccessToken = (token: string | undefined) => {
  currentAccessToken = token;
  console.log("  currentAccessToken =",currentAccessToken)
};
export const getAccessToken = () => {
  return currentAccessToken;
};
