import { Socket } from "socket.io";

export type JwtPayload = {
    email: string;
    sub: number;
  };
  export type JwtPayloadWithRt = JwtPayload & { refresh_token: string };
  export type SocketWithJwtPayload = Socket & JwtPayload;