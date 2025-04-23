import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetUser = createParamDecorator((data: string | undefined, context: ExecutionContext) => {
  const req:any = context.switchToHttp().getRequest();
  if (data) {
    return req.user[data]
  }
  return req.user
})