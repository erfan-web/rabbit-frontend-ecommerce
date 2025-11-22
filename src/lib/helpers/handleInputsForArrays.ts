

export function deleteDash(input: string) {
  return input.replace(/, /g, "");
}

export function addDash(input: string) {
  return Array.from(input).join(", ");
}
