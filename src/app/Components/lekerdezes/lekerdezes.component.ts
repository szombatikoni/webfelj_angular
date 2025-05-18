import { Component, OnInit } from '@angular/core';
import { LekerdezesService } from '../../Services/lekerdezes/lekerdezes.service';
import { Rendeles } from '../../Models/rendeles.model';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-lekerdezes',
  templateUrl: './lekerdezes.component.html',
  imports: [
    MatCardTitle,
    MatDivider,
    MatCard
  ],
  styleUrls: ['./lekerdezes.component.css']
})
export class LekerdezesComponent implements OnInit {

  utolso5: Rendeles[] = [];
  datumSzerint: Rendeles[] = [];
  sajat: Rendeles[] = [];
  nagyosszeg: Rendeles[] = [];

  constructor(private lekerdezesService: LekerdezesService) {}

  ngOnInit(): void {
    this.lekerdezesService.getUtolso5Rendeles().then(res => this.utolso5 = res);
    this.lekerdezesService.getRendelesekDatumSzerint().then(res => this.datumSzerint = res);
    this.lekerdezesService.getNagyOsszeguRendelesek().then(res => this.nagyosszeg = res);
    this.lekerdezesService.getRendelesekFelhasznaloSzerint('valamilyen-id').then(res => this.sajat = res);
  }
}
