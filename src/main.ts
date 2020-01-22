import { NestFactory } from "@nestjs/core"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./app.module"
import { AuthModule } from "auth/auth.module"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AuthModule)
  app.useGlobalPipes(new ValidationPipe())
  const options = new DocumentBuilder()
    .setTitle("auth")
    .setDescription("auth with jwt")
    .setVersion("1.0")
    .addTag("auth")
    .build()
  const doc = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup("api", app, doc)

  await app.listen(3000)
}
bootstrap()
