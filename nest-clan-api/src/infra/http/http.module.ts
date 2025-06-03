import { Module } from '@nestjs/common'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-questions.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { HomeController } from './controllers/home.controller'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    HomeController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
