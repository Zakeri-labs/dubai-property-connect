import { CONTACT } from "./contact";

export function waLink(message: string): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
