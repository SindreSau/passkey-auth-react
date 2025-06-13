import type { Route } from './+types/home';
import LoginForm from '~/components/forms/login-form';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Passkey Auth in React' },
    {
      name: 'description',
      content:
        'Implementing passwordless authentication using Passkeys in a React application.',
    },
  ];
}

export default function Home() {
  return (
    <div className="container mx-auto mt-16">
      <LoginForm />
    </div>
  );
}
