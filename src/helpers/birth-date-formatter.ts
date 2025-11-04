export const date_formatter = (text: string) => {
  let cleaned = text.replace(/\D/g, "");

  if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);

  let formatted = cleaned;
  if (cleaned.length > 4) {
    formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(
      2,
      4
    )}-${cleaned.slice(4)}`;
  } else if (cleaned.length > 2) {
    formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
  }

  return formatted;
}