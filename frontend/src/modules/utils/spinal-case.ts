export default function spinalCase(str: string): string {
  const spinal = str
    .replace(/(?!^)([A-Z])/g, ' $1')
    .replace(/[_\s]+(?=[a-zA-Z])/g, '-')
    .toLowerCase();
  return spinal;
}
