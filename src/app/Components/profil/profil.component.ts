import { Component } from '@angular/core';
import { Database, ref, set, get } from '@angular/fire/database';
import { FelhasznaloService } from '../../Services/felhasznalo/felhasznalo.service'; // vagy az aktuális útvonal
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-profil',
  imports: [CommonModule, RouterModule, FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  profilNev: string = '';
  profilEmail: string = '';
  userId: string = '';

  constructor(private db: Database, private felhasznaloService: FelhasznaloService) { }

  ngOnInit() {
    // Az aktuális felhasználó lekérése
    const user = this.felhasznaloService.getJelenlegiFelhasznalo();
    if (user) {
      this.userId = user.id;
      this.profilNev = user.nev;
      this.profilEmail = user.email;
    } 
  }

  async profilMentes() {
    if (!this.userId) {
      alert('Nem található felhasználó!');
      return;
    }
    const felhasznaloRef = ref(this.db, `felhasznalok/${this.userId}`);
    await set(felhasznaloRef, {
      id: this.userId,
      nev: this.profilNev,
      email: this.profilEmail,
      jelszo: this.felhasznaloService.getJelenlegiFelhasznalo()?.jelszo // Jelszó nem változik
    });
    alert('Profil mentve!');
  }
}
