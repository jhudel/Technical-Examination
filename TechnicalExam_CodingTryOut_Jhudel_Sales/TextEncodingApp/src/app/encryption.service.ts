import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  private static readonly characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  encodeString(input: string): string {
    const randomPrefix = this.generateRandomString(2);
    const randomSuffix = this.generateRandomString(2);
    return randomPrefix + this.encode(input) + randomSuffix;
  }

  decodeString(encodedWithFormat: string): string {
    const encoded = encodedWithFormat.substring(2, encodedWithFormat.length - 2);
    return this.decode(encoded);
  }

  private encode(input: string): string {
    return input.split('').map((char) => char.charCodeAt(0).toString(16)).join('');
  }

  private decode(encoded: string): string {
    return encoded.match(/.{1,2}/g)?.map((hex) => String.fromCharCode(parseInt(hex, 16))).join('') || '';
  }

  private generateRandomString(length: number): string {
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * EncryptionService.characters.length);
      randomString += EncryptionService.characters.charAt(randomIndex);
    }
    return randomString;
  }
}
