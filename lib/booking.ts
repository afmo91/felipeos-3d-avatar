const EMAIL = "felipe.mejia@spotz.pro";
const FALLBACK_SUBJECT = "Felipe OS discovery call";

export function hasBookingUrl() {
  return Boolean(process.env.NEXT_PUBLIC_BOOKING_URL?.trim());
}

export function getBookingHref() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  if (bookingUrl) return bookingUrl;

  return `mailto:${EMAIL}?subject=${encodeURIComponent(FALLBACK_SUBJECT)}`;
}

export function getBookingTarget() {
  return hasBookingUrl() ? "_blank" : undefined;
}
