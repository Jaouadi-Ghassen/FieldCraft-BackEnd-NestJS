import { Inject, Injectable } from '@nestjs/common';
import admin, { app } from 'firebase-admin';

@Injectable()
export class FirebaseService {
  public readonly _messaging: admin.messaging.Messaging;
  constructor(@Inject('FIREBASE_APP') private readonly firebaseApp: app.App) {
    this._messaging = firebaseApp.messaging();
  }

  messaging() {
    return this._messaging;
  }

  async sendNotification(token: string, title: string, body: string) {
    const message = {
      notification: {
        title,
        body,
      },
      token,
    };

    try {
      await this._messaging.send(message);
      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
}
