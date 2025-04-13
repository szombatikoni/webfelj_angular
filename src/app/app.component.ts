import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Aru } from './Models/aru.model';
import { Felhasznalo } from './Models/felhasznalo.model';
import { KosarComponent } from './Components/kosar/kosar.component';
import { RendelesComponent } from './Components/rendeles/rendeles.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, KosarComponent, RendelesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'piac';
  rendeles: { kosar: Aru[], felhasznalo: Felhasznalo, vegosszeg: number } | null = null;
  megrendelesKesz(adatok: { kosar: Aru[], felhasznalo: Felhasznalo, vegosszeg: number }) {
    this.rendeles = adatok;
  }

}
