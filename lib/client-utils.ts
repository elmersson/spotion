import { AuthSession } from '@/types/types';
export const customClientGet = async (
  url: string,
  session: AuthSession | null
) => {
  if (!session) {
    return null;
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  }).then((res) => res.json());

  return res;
};

export const customClientPost = async (
  url: string,
  session: AuthSession | null,
  body?: unknown
) => {
  if (!session) {
    throw new Error('Session is not available.');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} ${response.statusText}`
    );
  }
};
