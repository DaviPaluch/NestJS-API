import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  })

  const configService: ConfigService<Env, true> = app.get(ConfigService)
  const port = configService.get('PORT', { infer: true })
  await app.listen(port ?? 3333)

  // Exibir as rotas no console
  const server = app.getHttpServer()
  const router = server._events.request._router
  const availableRoutes = router.stack
    .filter((layer) => layer.route)
    .map(
      (layer) =>
        `${layer.route.stack[0].method.toUpperCase()} ${layer.route.path}`,
    )

  console.log('\n📌 Rotas disponíveis:')
  console.log(availableRoutes.join('\n'))
}
bootstrap()
