export type JwtPayload = {
    email: string;
    sub: number;
  };
  export type JwtPayloadWithRt = JwtPayload & { refresh_token: string };