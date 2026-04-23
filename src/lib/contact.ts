/** Public business and contact details for Yoventa Limited (single source of truth). */
export const company = {
  legalName: 'Yoventa Limited',
  /** Registered business focus: sales of computers and accessories */
  businessLine: 'Sales of computers and accessories',
  addressLines: [
    '5 Giwa Efungbotu Street',
    'Ikorodu, Lagos',
    'Nigeria',
  ] as const,
  /** Primary line (Nigeria) */
  phone: '0909 636 1340',
  email: 'operations@yoventadigital.com',
  website: 'https://yoventadigital.com',
} as const;

export function formatAddress(): string {
  return company.addressLines.join('\n');
}
