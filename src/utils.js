export default (string) => {
  const highlighter = '~'.repeat(string.length);
  return `${highlighter}\n${string}\n${highlighter}`;
};
