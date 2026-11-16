import { useState } from "react";
import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
} from "libphonenumber-js/max";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const countries = getCountries()
  .map((country) => ({
    code: country,
    name: regionNames.of(country) || country,
    callingCode: getCountryCallingCode(country),
  }))
  .sort((left, right) => left.name.localeCompare(right.name));

const PhoneNumberInput = ({
  id,
  value,
  country,
  onChange,
  onCountryChange,
  required = false,
  disabled = false,
  placeholder = "Phone number",
  autoComplete = "tel-national",
  inputClassName = "",
  selectClassName = "",
  className = "",
}) => {
  const [touched, setTouched] = useState(false);
  const empty = !value.trim();
  const valid = empty ? !required : isValidPhoneNumber(value, country);
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <div className="flex min-w-0 gap-2">
        <label className="sr-only" htmlFor={`${id}-country`}>Country calling code</label>
        <select
          id={`${id}-country`}
          value={country}
          onChange={(event) => onCountryChange(event.target.value)}
          disabled={disabled}
          autoComplete="tel-country-code"
          aria-label="Country calling code"
          className={selectClassName}
        >
          {countries.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name} (+{item.callingCode})
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor={id}>Phone number</label>
        <input
          id={id}
          type="tel"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          inputMode="tel"
          maxLength={40}
          placeholder={placeholder}
          aria-invalid={touched && !valid}
          aria-describedby={touched && !valid ? errorId : undefined}
          className={inputClassName}
        />
      </div>
      {touched && !valid && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-rose-600">
          {empty ? "Enter a phone number." : "Enter a valid phone number for the selected country."}
        </p>
      )}
    </div>
  );
};

export default PhoneNumberInput;
