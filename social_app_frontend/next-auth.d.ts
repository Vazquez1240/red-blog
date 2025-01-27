import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken?: string;
      refreshToken?: string;
      uuid?: string;
      userId?: number;
      isSuperuser?: boolean;
      email?: string;
      user_photo?: string;
    };
  }

  interface User {
    access: string;
    refresh: string;
    uuid: string;
    user_id: number;
    is_superuser: boolean;
    email: string;
    user_photo: string;
  }
}
