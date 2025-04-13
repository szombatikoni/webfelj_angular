import { inject, Injectable } from '@angular/core';
import { Felhasznalo } from '../../Models/felhasznalo.model';
import { KosarService } from '../kosar/kosar.service';
import { Database, getDatabase, ref, push, set, get, child } from '@angular/fire/database';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FelhasznaloService {

  private jelenlegiFelhasznalo: Felhasznalo | null = null;

  constructor(private kosarService: KosarService, private db: Database) { }

  async regisztral(nev: string, email: string, jelszo: string): Promise<boolean> {

    const felhasznaloRef = ref(this.db, 'felhasznalok'); // Firebase referencia a felhasználókhoz
    const snapshot = await get(felhasznaloRef); // Az összes felhasználó lekérése

    if (snapshot.exists()) {
      const felhasznalok: Felhasznalo[] = Object.values(snapshot.val()); // A lekért felhasználók tömbje
      if (felhasznalok.some(f => f.email === email)) {  // Ellenőrizzük, hogy van-e már ilyen email cím
        return false;
      }
    }

    // Új felhasználó létrehozása
    const ujFelhasznalo: Felhasznalo = {
      id: uuidv4(),  // Használhatunk egyedi azonosítót (pl. timestamp)
      nev: nev,
      email: email,
      jelszo: jelszo
    };

    // Felhasználó mentése a Firebase adatbázisba
    await push(felhasznaloRef, ujFelhasznalo);

    // Kosár létrehozása
    this.kosarService.kosarLetrehozasa(ujFelhasznalo.id);

    return true;
  }


  async bejelentkezes(email: string, jelszo: string): Promise<boolean> {
    const felhasznaloRef = ref(this.db, 'felhasznalok');
    const snapshot = await get(felhasznaloRef);

    if (snapshot.exists()) {
      const felhasznalok: Felhasznalo[] = Object.values(snapshot.val());
      const felhasznalo = felhasznalok.find(f => f.email === email && f.jelszo === jelszo);

      if (felhasznalo) {
        this.jelenlegiFelhasznalo = felhasznalo;
        return true;
      }     
    }
    return false;
  }

  kijelentkezes() {
    this.jelenlegiFelhasznalo = null;
  }

  getJelenlegiFelhasznalo(): Felhasznalo | null {
    return this.jelenlegiFelhasznalo;
  }

  belepett(): boolean {
    return this.jelenlegiFelhasznalo !== null;
  }

async getFelhasznalok(): Promise < Felhasznalo[] > {
  const snapshot = await get(ref(this.db, 'felhasznalok'));
  const data = snapshot.val();
  return data ? Object.values(data) : [];
}

}
