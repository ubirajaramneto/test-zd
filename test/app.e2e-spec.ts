import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/pos/find-nearest', () => {
    return request(app.getHttpServer())
      .get('/pos/find-nearest?lat=-22.988580132556987&long=-43.35256576538086')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
