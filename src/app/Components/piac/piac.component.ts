import {CommonModule, NgOptimizedImage} from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Aru } from '../../Models/aru.model';
import { KosarService } from '../../Services/kosar/kosar.service';
import {  FtKgPipe } from '../../Pipes/ft-kg.pipe';


@Component({
  selector: 'app-piac',
  standalone: true,
  imports: [CommonModule, RouterModule, FtKgPipe, NgOptimizedImage],
  templateUrl: './piac.component.html',
  styleUrls: ['./piac.component.css']
})


export class PiacComponent {

  constructor(private kosarService: KosarService) { }

  aruk: Aru[] = [
    { nev: 'káposzta', kg: 0, alapar: 500, kep: 'cabbage.png' },
    { nev: 'répa', kg: 0, alapar: 600, kep: 'carrot.png'},
    { nev: 'alma', kg: 0, alapar: 700, kep: 'apple.png' },
    { nev: 'citrom', kg: 0, alapar: 800, kep: 'lemon.png' },
  ];

  sikeresUzenetLathato = false;
  ervenytelenErtek = false;

  kosarhozAd(kapottAru: Aru, kapottKg: number) {
    this.sikeresUzenetLathato = false;
    this.ervenytelenErtek = false;

    if (Number.isNaN(kapottKg) || kapottKg <= 0) {
      this.ervenytelenErtek = true;
      return;
    }


    this.kosarService.kosarhozAd(kapottAru, kapottKg)
    this.sikeresUzenetLathato = true;

    console.log('Kosár tartalma: ', this.kosarService.getKosar());

  }
}

