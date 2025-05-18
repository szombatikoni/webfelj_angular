import { Component, EventEmitter, Output } from '@angular/core';
import { Aru } from '../../Models/aru.model';
import { KosarService } from '../../Services/kosar/kosar.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FelhasznaloService } from '../../Services/felhasznalo/felhasznalo.service';
import { Futar } from '../../Models/futar.model';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule } from '@angular/forms';
import { Felhasznalo } from '../../Models/felhasznalo.model';


@Component({
  selector: 'app-kosar',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './kosar.component.html',
  styleUrl: './kosar.component.css'
})
export class KosarComponent {

  kosar: Aru[] = [];
  futarok: Futar[] = [];
  valasztottFutar!: Futar;
  bejelentkezettFelhasznalo: Felhasznalo | null | undefined;

  constructor(private kosarService: KosarService, private felhasznaloService: FelhasznaloService, private router: Router) {
    this.futarok = [{
      id: uuidv4(), nev: "SLG", telefonszam: "06-40-421-7677", ar: 5000
    },
    {
      id: uuidv4(), nev: "PDP", telefonszam: "06-99-441-2211", ar: 6000
    },
    {
      id: uuidv4(), nev: "Magyar Posta", telefonszam: "06-77-332-1111", ar: 7000
    }];
  }



  ngOnInit() {
    this.kosarService.getKosar().subscribe(kosar => {
      this.kosar = kosar;
    });

    this.bejelentkezettFelhasznalo = this.felhasznaloService.getJelenlegiFelhasznalo();
  }

  kosarbolTorol(aru: Aru) {
    this.kosarService.kosarbolTorol(aru);
    console.log('Kosár tartalma: ', this.kosarService.getKosar());
  }

  kijelentkezes() {
    this.felhasznaloService.kijelentkezes();
  }

  kosarOsszeg() {
    if (this.valasztottFutar) {
      const kosarOsszeg = this.kosar.reduce((ossz, aru) => ossz + (aru.kg * aru.alapar), 0);
      return kosarOsszeg + this.valasztottFutar.ar;
    }
    else {
      return this.kosar.reduce((ossz, aru) => ossz + (aru.kg * aru.alapar), 0);
    }
  }

  valasztoFutarValtozas(event: any) {
    const selectedFutarId = event.target.value;
    const futarok = this.futarok.find(futar => futar.id === selectedFutarId);

    if (futarok) {
      this.valasztottFutar = futarok;
    }

  }

  async megrendeles() {
    const vegosszeg = this.kosarOsszeg();
    await this.kosarService.rendelesLetrehozasa(this.kosarService.getKosarObj(), this.felhasznaloService.getJelenlegiFelhasznalo(), vegosszeg, this.valasztottFutar);
    this.router.navigate(['/rendeles']);
  }
}


