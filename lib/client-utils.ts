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
