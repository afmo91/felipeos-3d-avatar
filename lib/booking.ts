const EMAIL = "felipe.mejia@spotz.pro";
const FALLBACK_SUBJECT = "Felipe OS discovery call";
let warnedAboutBookingUrl = false;

function getRawBookingUrl() {
  return process.env.NEXT_PUBLIC_BOOKING_URL?.trim() ?? "";
}

function isValidBookingUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

function warnInDevelopment(value: string) {
  if (process.env.NODE_ENV === "production" || warnedAboutBookingUrl) return;

  warnedAboutBookingUrl = true;
  if (!value) {
    console.warn(
      "NEXT_PUBLIC_BOOKING_URL is missing. Felipe OS booking CTAs will fall back to email in development.",
    );
    return;
  }

  console.warn(
    "NEXT_PUBLIC_BOOKING_URL must start with http:// or https://. Felipe OS booking CTAs will fall back to email in development.",
  );
}

function getValidBookingUrl() {
  const bookingUrl = getRawBookingUrl();
  if (isValidBookingUrl(bookingUrl)) return bookingUrl;
  warnInDevelopment(bookingUrl);
  return "";
}

export function hasBookingUrl() {
  return Boolean(getValidBookingUrl());
}

export function getBookingHref() {
  const bookingUrl = getValidBookingUrl();
  if (bookingUrl) return bookingUrl;

  return `mailto:${EMAIL}?subject=${encodeURIComponent(FALLBACK_SUBJECT)}`;
}

export function getBookingTarget() {
  return hasBookingUrl() ? "_blank" : undefined;
}
