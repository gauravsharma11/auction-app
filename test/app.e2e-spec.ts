import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auctionItems (GET)', () => {
    return request(app.getHttpServer())
      .get('/auctionItems')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        // Add your assertions here to verify the response data
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
