import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

export class PhoneUtils {
  static validate(phone: string, country: CountryCode = 'AR') {
    const phoneNumber = parsePhoneNumberFromString(phone || '', country);
    return phoneNumber?.isValid()
  }

 static format(phone: string, country: CountryCode) {
    const parsed = parsePhoneNumberFromString(phone, country);
    if (!parsed) return;

    let number = String(parsed.nationalNumber);

    const prefixMap: Partial<Record<CountryCode, string>> = {
      AR: '9',
      MX: '1',
      BR: '9',
    };

    const prefix = prefixMap[country];
    if (prefix && !number.startsWith(prefix)) number = prefix + number;

    return number;
  }
}