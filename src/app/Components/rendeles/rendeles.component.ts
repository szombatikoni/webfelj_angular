import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Aru } from '../../Models/aru.model';
import { KosarService } from '../../Services/kosar/kosar.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FelhasznaloService } from '../../Services/felhasznalo/felhasznalo.service';
import { Futar } from '../../Models/futar.model';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule } from '@angular/forms';
import { Felhasznalo } from '../../Models/felhasznalo.model';
import { Rendeles } from '../../Models/rendeles.model';

 


@Component({
  selector: 'app-rendeles',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './rendeles.component.html',
  styleUrl: './rendeles.component.css'
})
export class RendelesComponent {

  rendeles!: Rendeles;

  constructor(private kosarService: KosarService) {
    this.rendeles = kosarService.getAktualisRendeles();
    console.log();
  }
}
