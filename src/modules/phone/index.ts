import type { Faker } from '../..';
import { deprecated } from '../../internal/deprecated';

/**
 * Module to generate phone-related data.
 */
export class Phone {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Phone.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Generates a random phone number.
   *
   * @param format Format of the phone number. Defaults to a random phone number format.
   *
   * @example
   * faker.phone.phoneNumber() // '961-770-7727'
   * faker.phone.phoneNumber('501-###-###') // '501-039-841'
   * faker.phone.phoneNumber('+48 91 ### ## ##') // '+48 91 463 61 70'
   */
  // TODO @pkuczynski 2022-02-01: simplify name to `number()`
  phoneNumber(format?: string): string {
    format =
      format ??
      this.faker.helpers.arrayElement(
        this.faker.definitions.phone_number.formats
      );
    return this.faker.helpers.replaceSymbolWithNumber(format);
  }

  /**
   * Returns phone number in a format of the given index from `faker.definitions.phone_number.formats`.
   *
   * @param phoneFormatsArrayIndex Index in the `faker.definitions.phone_number.formats` array. Defaults to `0`.
   *
   * @see faker.phone.phoneNumber
   * @see faker.helpers.replaceSymbolWithNumber
   *
   * @example
   * faker.phone.phoneNumberFormat() // '943-627-0355'
   * faker.phone.phoneNumberFormat(3) // '282.652.3201'
   *
   * @deprecated
   */
  phoneNumberFormat(phoneFormatsArrayIndex = 0): string {
    deprecated({
      deprecated: 'faker.phone.phoneNumberFormat()',
      proposed:
        'faker.phone.phoneNumber() or faker.helpers.replaceSymbolWithNumber(format)',
      since: 'v7.0',
      until: 'v8.0',
    });
    return this.faker.helpers.replaceSymbolWithNumber(
      this.faker.definitions.phone_number.formats[phoneFormatsArrayIndex]
    );
  }

  /**
   * Returns a random phone number format.
   *
   * @see faker.phone.phoneNumber
   * @see faker.definitions.phone_number.formats
   *
   * @example
   * faker.phone.phoneFormats() // '!##.!##.####'
   *
   * @deprecated
   */
  phoneFormats(): string {
    deprecated({
      deprecated: 'faker.phone.phoneFormats()',
      proposed: 'faker.phone.phoneNumber()',
      since: 'v7.0',
      until: 'v8.0',
    });
    return this.faker.helpers.arrayElement(
      this.faker.definitions.phone_number.formats
    );
  }

  /**
   * Generates IMEI number.
   *
   * @example
   * faker.phone.imei() // '13-850175-913761-7'
   */
  imei(): string {
    return this.faker.helpers.replaceCreditCardSymbols(
      '##-######-######-L',
      '#'
    );
  }
}
