/** Public business and contact details for Yoventa Limited (single source of truth). */
export const company = {
  legalName: 'Yoventa Limited',
  /** Registered business focus */
  businessLine: 'Sales of computers and its accessories',
  addressLines: [
    '5 Giwa Efungbotu Street',
    'Ikorodu, Lagos',
    'Nigeria',
  ] as const,
  /** Primary line (Nigeria) */
  phone: '0909 636 1340',
  email: 'operations@yoventaltd.com',
  website: 'https://yoventaltd.com',
} as const;

export function formatAddress(): string {
  return company.addressLines.join('\n');
}
