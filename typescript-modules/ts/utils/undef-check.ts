export function undefCheck(value: any, message = "Error message not specified."): void {
  if (!value) throw Error(message);
}