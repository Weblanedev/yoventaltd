import { RequireAuth } from '@/routes/RequireAuth';
import { AffiliateProgram } from './AffiliateProgram';

export const metadata = {
  title: 'Affiliate program',
  description:
    'Apply to promote Yoventa and earn commission when customers buy through your link.',
};

export default function AffiliatePage() {
  return (
    <RequireAuth>
      <AffiliateProgram />
    </RequireAuth>
  );
}
