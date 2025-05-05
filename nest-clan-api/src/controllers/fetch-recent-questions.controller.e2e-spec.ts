import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/app.module'
import { afterAll, afterAll } from 'vitest'
import { PrismaService } from '@/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'

describe('Fetch recent question (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it(`[GET] /questions`, async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      },
    })

    const accessToken = await jwt.sign({ sub: user.id })

    await prisma.question.createMany({
      data: [
        {
          title: 'question 01',
          content: 'question-01',
          slug: 'question-01',
          authorId: user.id,
        },
        {
          title: 'question 02',
          content: 'question-02',
          slug: 'question-02',
          authorId: user.id,
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toBeDefined()
  })

  afterAll(async () => {
    await app.close()
  })
})
