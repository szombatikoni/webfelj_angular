import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Aru } from './Models/aru.model';
import { Felhasznalo } from './Models/felhasznalo.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'piac';
  //rendeles: { kosar: Aru[], felhasznalo: Felhasznalo, vegosszeg: number } | null = null;
}
