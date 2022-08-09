export const isEquivalentRoute = (route: string, compareRoute: string): boolean => {
  try {
    if (route === compareRoute) return true;
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
