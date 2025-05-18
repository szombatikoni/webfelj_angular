import { Injectable } from '@angular/core';
import {
  Database,
  ref,
  query,
  get,
  orderByChild,
  startAt,
  limitToLast,
  equalTo
} from '@angular/fire/database';
import { Rendeles } from '../../Models/rendeles.model';

@Injectable({
  providedIn: 'root'
})
export class LekerdezesService {
  constructor(private db: Database) {}


  async getUtolso5Rendeles(): Promise<Rendeles[]> {
    const queryRef = query(ref(this.db, 'rendelesek'), limitToLast(5));
    const snapshot = await get(queryRef);
    return snapshot.exists() ? Object.values(snapshot.val()) : [];
  }


  async getRendelesekDatumSzerint(): Promise<Rendeles[]> {
    const queryRef = query(ref(this.db, 'rendelesek'), orderByChild('datum'));
    const snapshot = await get(queryRef);
    return snapshot.exists() ? Object.values(snapshot.val()) : [];
  }


  async getRendelesekFelhasznaloSzerint(felhasznaloId: string): Promise<Rendeles[]> {
    const queryRef = query(ref(this.db, 'rendelesek'), orderByChild('rendelo/id'), equalTo(felhasznaloId));
    const snapshot = await get(queryRef);
    return snapshot.exists() ? Object.values(snapshot.val()) : [];
  }


  async getNagyOsszeguRendelesek(): Promise<Rendeles[]> {
    const queryRef = query(ref(this.db, 'rendelesek'), orderByChild('vegosszeg'), startAt(5000));
    const snapshot = await get(queryRef);
    return snapshot.exists() ? Object.values(snapshot.val()) : [];
  }
}
