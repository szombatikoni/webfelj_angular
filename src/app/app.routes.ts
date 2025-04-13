import { Routes } from '@angular/router';
import { PiacComponent } from './Components/piac/piac.component';
import { KosarComponent } from './Components/kosar/kosar.component';
import { KezdoLapComponent } from './Components/kezdo-lap/kezdo-lap.component';
import { RendelesComponent } from './Components/rendeles/rendeles.component';

export const routes: Routes = [
  { path: 'piac', component: PiacComponent },
  { path: 'kosar', component: KosarComponent },
  { path: 'rendeles', component: RendelesComponent },
  { path: 'kezdo-lap', component: KezdoLapComponent },
  { path: '', redirectTo: '/kezdo-lap', pathMatch: 'full' }
  
];
