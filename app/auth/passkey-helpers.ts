import { APP_DOMAIN } from '~/config/constants';

// For testing:
let rawId: ArrayBuffer | null = null;

export const signup = async (email: string) => {
  console.log(`Signing up with email: ${email}`);

  console.log(APP_DOMAIN);

  const data = (await navigator.credentials.create({
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
  })) as PublicKeyCredential | null;

  rawId = data ? data.rawId : null;

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

export const login = async (email: string) => {
  console.log(`Logging in with email: ${email}`);

  const data = (await navigator.credentials.get({
    publicKey: {
      challenge: crypto.getRandomValues(new Uint8Array(32)), // This will be replaced with your server-generated challenge
      allowCredentials: [
        { type: 'public-key', id: rawId || new Uint8Array(16) }, // Use the rawId from the signup process
      ],
      rpId: APP_DOMAIN,
      userVerification: 'preferred',
    },
  })) as PublicKeyCredential | null;

  rawId = data ? data.rawId : null;

  console.log('Credential retrieved:', data);
  if (!data) {
    return {
      status: 'error',
      message: 'Failed to retrieve credential',
    };
  }
  return {
    status: 'success',
    message: 'Credential retrieved successfully',
  };
};
