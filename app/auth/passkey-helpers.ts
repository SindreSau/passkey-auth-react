import { APP_DOMAIN } from '~/config/constants';

export const signup = async (email: string) => {
  console.log(`Signing up with email: ${email}`);

  console.log(APP_DOMAIN);

  const data = await navigator.credentials.create({
    publicKey: {
      challenge: crypto.getRandomValues(new Uint8Array(32)), // This will be replaced with your server-generated challenge
      rp: {
        // rp (Relying Party) is the entity that is requesting the authentication
        name: 'react-passkey-app',
        id: APP_DOMAIN,
      },
      user: {
        id: crypto.getRandomValues(new Uint8Array(16)), // Unique user ID, should be stored in your database
        name: email,
        displayName: '', // Optional display name
      },
      pubKeyCredParams: [
        {
          type: 'public-key',
          alg: -7, // ECDSA with SHA-256
        },
        {
          type: 'public-key',
          alg: -8, // ECDSA with SHA-384
        },
        {
          type: 'public-key',
          alg: -257, // ECDSA with SHA-512
        },
      ],
    },
  });

  console.log('Credential created:', data);
  if (!data) {
    return {
      status: 'error',
      message: 'Failed to create credential',
    };
  }
  return {
    status: 'success',
    message: 'Credential created successfully',
  };
};
