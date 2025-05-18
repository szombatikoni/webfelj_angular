import { Component, OnInit } from '@angular/core';
import { FelhasznaloService } from '../../Services/felhasznalo/felhasznalo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-kezdo-lap',
  imports: [CommonModule, FormsModule, RouterModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatButtonModule, MatCardModule],
  templateUrl: './kezdo-lap.component.html',
  styleUrl: './kezdo-lap.component.css'
})
export class KezdoLapComponent implements OnInit{
  email: string = '';
  jelszo: string = '';
  nev: string = '';
  emailReg: string = '';
  jelszoReg: string = '';

  ngOnInit(): void {
    console.log('A KezdoLapComponent inicializálódott!');
  }

  ngOnDestroy(): void {
    console.log('A KezdoLapComponent el fog tűnni az oldalról.');
  }

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
