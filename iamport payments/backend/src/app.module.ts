import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IamportController } from './iamport/iamport.controller';
import { IamportService } from './iamport/iamport.service';
import { IamportModule } from './iamport/iamport.module';

@Module({
  imports: [IamportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
