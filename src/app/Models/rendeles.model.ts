import { Aru } from "./aru.model";
import { Felhasznalo } from "./felhasznalo.model";
import { Futar } from "./futar.model";

export type Rendeles = {
  id: string;
  rendelo: Felhasznalo;
  aruk: Aru[];
  futar: Futar;
  datum: string;
  vegosszeg: number;
}
