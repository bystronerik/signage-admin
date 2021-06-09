import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RandomGeneratorService {
  private readonly ID_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private readonly TOKEN_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private readonly PASSWORD_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ?!_-.@#$%';

  generateString(length: number, possible: string): string {
    let text = '';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  generateToken(): string {
    let token = '';

    for (let i = 0; i < 4; i++) {
      token += this.generateString(5, this.TOKEN_CHARS);

      if (i < 3) {
        token += '-';
      }
    }

    return token;
  }

  generatePassword(): string {
    return this.generateString(10, this.PASSWORD_CHARS);
  }

  generateId(): string {
    return this.generateString(16, this.ID_CHARS);
  }
}
