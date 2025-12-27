export const generateFakeToken = (user) => {
  return btoa(
    JSON.stringify({
      id: user.id,
      role: user.role,
      exp: Date.now() + 60 * 60 * 1000,
    })
  );
};
