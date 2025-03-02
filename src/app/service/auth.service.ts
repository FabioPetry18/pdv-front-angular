import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private secretKey = 'ab3e4965-51f5-4720-80e1-96ae50a6a55b'; 

  // Método para criptografar e armazenar o JSON no sessionStorage
  storeUserData(userData: any): void {
    const encryptedData = this.encrypt(JSON.stringify(userData));
    sessionStorage.setItem('userData', encryptedData);
  }

  // Método para recuperar e descriptografar o JSON do sessionStorage
  getUserData(): any {
    const encryptedData = sessionStorage.getItem('userData');
    if (encryptedData) {
      const decryptedData = this.decrypt(encryptedData);
      return JSON.parse(decryptedData);
    }
    return null;
  }

  // Método para criptografar dados
  private encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }

  // Método para descriptografar dados
  private decrypt(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
