import { Component } from '@angular/core';
import { FelhasznaloService } from '../../Services/felhasznalo/felhasznalo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-kezdo-lap',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './kezdo-lap.component.html',
  styleUrl: './kezdo-lap.component.css'
})
export class KezdoLapComponent {
  email: string = '';
  jelszo: string = '';
  nev: string = '';
  emailReg: string = '';
  jelszoReg: string = '';

  belepett: boolean = false;
  constructor(private felhasznaloService: FelhasznaloService) {
    this.belepett = this.felhasznaloService.belepett();
  }

  async bejelentkezes() {
    const succes = await this.felhasznaloService.bejelentkezes(this.email, this.jelszo);
    if (succes) {
      this.belepett = true;
    }
    else {
      alert('Hibás email vagy jelszó!');
    }
  }

  async regisztracio() {
    const success = await this.felhasznaloService.regisztral(this.nev, this.emailReg, this.jelszoReg);
    if (success) {
      alert('Sikeres regisztráció! Most már bejelentkezhet.');
    }
    else {
      alert('Már létezik ilyen email cím!');
    }
  }


  kijelentkezes() {
    this.felhasznaloService.kijelentkezes();
    this.belepett = false;
  }

}
