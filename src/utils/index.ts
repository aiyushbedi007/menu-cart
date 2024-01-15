// a utility that interpolates a list of classes and outputs a string
export const cls = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};
