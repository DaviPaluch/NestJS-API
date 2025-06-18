import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  })

  const config = new DocumentBuilder()
    .setTitle('Forum API')
    .setDescription(
      'API de um fórum de perguntas e respostas com suporte a comentários, anexos e notificações.\n\n⚠️ Esta "DOCUMENTAÇÃO" é apenas para fins de demonstração e **não representa o projeto real**.',
    )
    .setVersion('1.0')
    .addTag(
      'Perguntas',
      'Gerenciamento de perguntas (criar, editar, excluir, buscar, etc).',
    )
    .addTag('Respostas', 'Gerenciamento de respostas às perguntas.')
    .addTag('Comentários', 'Comentários em perguntas e respostas.')
    .addTag('Anexos', 'Gerenciamento de arquivos anexados.')
    .addTag('Notificações', 'Notificações e eventos do sistema.')
    .addTag('Eventos de Domínio', 'Eventos que disparam ações assíncronas.')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

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
