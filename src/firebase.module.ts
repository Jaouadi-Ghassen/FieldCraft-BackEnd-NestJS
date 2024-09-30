import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { FirebaseService } from './firebase.service';

dotenv.config();

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const firebaseConfig = {
      type: process.env.TYPE,
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      auth_uri: process.env.AUTH_URI,
      token_uri: process.env.TOKEN_URI,
      auth_provider_x509_cert_url: process.env.AUTH_CERT_URL,
      client_x509_cert_url: process.env.CLIENT_CERT_URL,
      universe_domain: process.env.UNIVERSAL_DOMAIN,
    } as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });
  },
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [firebaseProvider, FirebaseService],
  exports: [firebaseProvider, FirebaseService],
})
export class FirebaseModule {}
