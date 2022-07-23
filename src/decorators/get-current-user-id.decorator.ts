import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayloadWithRt } from "src/user/types/jwtPayload.type";

export const getCurrentUserId = createParamDecorator(
    (_, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.user['sub'];
      }
)