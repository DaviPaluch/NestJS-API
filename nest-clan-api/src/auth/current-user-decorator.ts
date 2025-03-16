import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserPayloadSchema } from './jwt.strategy'

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    // ExecutionContext traz o contexto da classe onde o paramDecorator é usado
    const request = context.switchToHttp().getRequest()

    return request.user as UserPayloadSchema
  },
)
