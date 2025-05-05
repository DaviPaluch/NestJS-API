import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/app.module'
import { afterAll } from 'vitest'
import { PrismaService } from '@/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'

describe('Create Question (E2E)', () => {
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

  it(`[POST] /questions`, async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      },
    })

    const accessToken = await jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Title question',
        content: 'quetion content',
      })

    expect(response.statusCode).toBe(201)

    const questionOnDataBase = await prisma.question.findFirst({
      where: {
        title: 'Title question',
      },
    })

    expect(questionOnDataBase).toBeTruthy()
  })

  afterAll(async () => {
    await app.close()
  })
})
