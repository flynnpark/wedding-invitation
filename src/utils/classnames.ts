function classnames(...args: string[]): string {
  const classes = [];
  for (const arg of args) {
    if (arg) {
      classes.push(arg);
    }
  }
  return classes.join(' ');
}

export default classnames;
