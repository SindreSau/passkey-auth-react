import { useState } from 'react';
import { login, signup } from '~/auth/passkey-helpers';
import Button from '../button';

type LoginFormProps = {};

const LoginForm = ({}: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateEmail = (email: string): string | null => {
    if (!email.trim()) {
      return 'Email is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }

    return null;
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    // Clear errors if validation passes
    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await signup(email);
      console.log('Signup result:', result);
    } catch (error) {
      // Handle signup error
      setErrors({ email: 'Signup failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    // Clear errors if validation passes
    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await login(email);
      console.log('Login result:', result);
      if (result.status === 'success') {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      // Handle login error
      setErrors({ email: 'Login failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-4 border p-4 rounded mx-auto min-w-fit @container max-w-xl">
      <h2>Login</h2>

      <div className="flex flex-col gap-1">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => {
            const emailError = validateEmail(email);
            setErrors({ email: emailError || undefined });
          }}
          required
          className={`border px-2 py-1 rounded min-w-[300px] ${
            errors.email ? 'border-red-500 focus:border-red-500' : ''
          }`}
          disabled={isSubmitting}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
      </div>

      <div className="flex gap-2 @md:flex-row flex-col">
        <Button onClick={handleSignUp} disabled={isSubmitting}>
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </Button>

        <Button onClick={handleLogin} disabled={isSubmitting}>
          {isSubmitting ? 'Logging In...' : 'Log In'}
        </Button>
      </div>

      {status === 'success' && (
        <span className="text-green-500">Logged in successfully!</span>
      )}
      {status === 'error' && (
        <span className="text-red-500">
          An error occurred. Please try again.
        </span>
      )}
    </form>
  );
};

export default LoginForm;
