import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      access?: string;
      refresh?: string;
      uuid?: string;
      user_id?: number;
      is_superuser?: boolean;
      email?: string;
    }
  }

  interface User {
    access: string;
    refresh: string;
    uuid: string;
    user_id: number;
    is_superuser: boolean;
    email: string;
  }
}
