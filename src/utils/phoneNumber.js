import { parsePhoneNumberFromString } from "libphonenumber-js/max";

export const isValidPhoneInput = (value, country) => {
  const number = String(value || "").trim();
  if (!number) return false;
  const parsed = parsePhoneNumberFromString(number, country);
  return Boolean(parsed?.isValid());
};

export const toE164PhoneNumber = (value, country) => {
  const number = String(value || "").trim();
  if (!number) return "";
  const parsed = parsePhoneNumberFromString(number, country);
  return parsed?.isValid() ? parsed.number : "";
};

export const parseInternationalPhoneNumber = (value) => {
  const parsed = parsePhoneNumberFromString(String(value || ""));
  if (!parsed?.isValid()) return null;
  return {
    country: parsed.country || "CA",
    nationalNumber: parsed.nationalNumber,
  };
};

export const formatPhoneNumberForDisplay = (value, country) => {
  const normalized = toE164PhoneNumber(value, country);
  if (!normalized) return value;
  const parsed = parsePhoneNumberFromString(normalized);
  return parsed?.formatInternational() || normalized;
};
