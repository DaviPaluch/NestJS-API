import { Controller, Get } from '@nestjs/common'

@Controller('/')
// @UseGuards(AuthGuard('jwt'))
export class HomeController {
  constructor() {}

  @Get()
  async handle() {
    return 'ok'
  }
}
