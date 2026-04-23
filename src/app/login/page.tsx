import { Suspense } from 'react';
import { PageLoader } from '@/components/ui/PageLoader';
import { LoginForm } from './LoginForm';

export const metadata = {
  title: 'Log in',
};

export default function LoginPage() {
  return (
    <Suspense fallback={<PageLoader className="min-h-[40vh]" />}>
      <LoginForm />
    </Suspense>
  );
}
