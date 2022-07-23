import { createParamDecorator, ExecutionContext } from "@nestjs/common";
export const getCurrentUserId = createParamDecorator(
    (_, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.user['sub'];
      }
)