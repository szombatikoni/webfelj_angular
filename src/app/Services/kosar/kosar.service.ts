import { Injectable, Injector } from '@angular/core';
import { Aru } from '../../Models/aru.model';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { FelhasznaloService } from '../felhasznalo/felhasznalo.service';
import { Database, getDatabase, ref, push, set, get, child, onValue } from '@angular/fire/database';
import { Felhasznalo } from '../../Models/felhasznalo.model';
import { Rendeles } from '../../Models/rendeles.model';
import { Futar } from '../../Models/futar.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class KosarService {

  private aktualisRendeles!: Rendeles;
  private _felhasznaloService?: FelhasznaloService;
  private get felhasznaloService(): FelhasznaloService {
    if (!this._felhasznaloService) {
      this._felhasznaloService = this.injector.get(FelhasznaloService);     //muszaj igy atadni a fuggoseget DI helyett, mert akkor körkörös függőség lesz *
    }
    return this._felhasznaloService;
  }
  constructor(private injector: Injector, private db: Database) { }



  async kosarLetrehozasa(felhasznaloId: string) {
    const kosarRef = ref(this.db, `kosarak/${felhasznaloId}`);
    await set(kosarRef, []);
  }



  async kosarhozAd(aru: Aru, kg: number) {
    const felhasznalo = this.felhasznaloService.getJelenlegiFelhasznalo();
    if (!felhasznalo) return;

    const kosarRef = ref(this.db, `kosarak/${felhasznalo.id}`);
    const snapshot = await get(kosarRef);
    let kosar: Aru[] = snapshot.exists() ? snapshot.val() : [];

    let talalt = kosar.find(a => a.nev === aru.nev);
    if (talalt) {
      talalt.kg += kg;
    } else {
      kosar.push({ nev: aru.nev, kg, alapar: aru.alapar, kep: aru.kep });
    }

    await set(kosarRef, kosar);
    console.log('Kosárba téve (Firebase):', aru.nev, kg);
  }


  getKosar(): Observable<Aru[]> {
    const felhasznalo = this.felhasznaloService.getJelenlegiFelhasznalo();
    if (!felhasznalo) return of([]);

    const kosarRef = ref(this.db, `kosarak/${felhasznalo.id}`);


    return new Observable<Aru[]>(observer => {
      const unsubscribe = onValue(kosarRef, (snapshot) => {
        const kosar = snapshot.exists() ? snapshot.val() : [];
        observer.next(kosar);
      }, (error) => {
        console.error('Hiba a kosár valós idejű figyelésekor:', error);
        observer.error(error);
      });

      return () => unsubscribe();
    });
  }

  async getKosarObj(): Promise<Aru[]>{
  const felhasznalo = this.felhasznaloService.getJelenlegiFelhasznalo();
  if (!felhasznalo) return [];
    const kosarRef = ref(this.db, `kosarak/${felhasznalo.id}`);
    const snapshot = await get(kosarRef);

    if (!snapshot.exists()) return [];

    const rawData = snapshot.val();

    
    const kosar: Aru[] = rawData.map((item: any) => ({
      id: item.id,
      nev: item.nev,
      alapar: item.alapar,
      kg: item.kg
    }));

    return kosar;
  }


  async kosarbolTorol(aru: Aru): Promise<void> {
    const felhasznalo = this.felhasznaloService.getJelenlegiFelhasznalo();
    if (!felhasznalo) return;

    const kosarRef = ref(this.db, `kosarak/${felhasznalo.id}`);
    const snapshot = await get(kosarRef);
    let kosar: Aru[] = snapshot.exists() ? snapshot.val() : [];

    kosar = kosar.filter(a => a.nev !== aru.nev);
    await set(kosarRef, kosar);
    console.log('Törölve a kosárból:', aru.nev);
  }

  async rendelesLetrehozasa(kosarPromise: Promise<Aru[]>, vasarlo: Felhasznalo | null, vegosszeg: number, futar: Futar): Promise<Rendeles | null> {
    if (vasarlo) {
      const kosar = await kosarPromise;
      return this.aktualisRendeles = {
        aruk: kosar,
        futar: futar,
        id: uuidv4(),
        rendelo: vasarlo,
        datum: Date.now().toString(),
        vegosszeg: vegosszeg
      };
    }
    else return null;
  }

  getAktualisRendeles() {

    return this.aktualisRendeles;
  }

}
