import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayloadSchema } from 'src/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { number, z } from 'zod'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private prismaService: PrismaService) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const perPage = 1

    const questions = await this.prismaService.question.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return questions
  }
}

function stringToSlug(str: string): string {
  return str
    .normalize('NFD') // Normalize the string to decompose accents
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks (accents)
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
    .trim() // Trim leading and trailing spaces
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove consecutive hyphens
}
