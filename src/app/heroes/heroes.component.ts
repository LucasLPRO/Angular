import { Component, OnInit } from '@angular/core';

import { Hero } from '../data/hero';
import { HeroService } from '../services/hero.service';
import {WeaponService} from '../services/weapon.service';
import {Weapon} from '../data/weapon';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  heroesSauvegarde: Hero[];
  weapons: Weapon[];
  triCroissantNom = null;
  triCroissantAttaque = null;
  triCroissantEsquive = null;
  triCroissantDegats = null;
  triCroissantPV = null;
  triCroissantArme = null;
  filtreArme = false;
  formFiltreArme = new FormGroup({
    arme: new FormControl('')
  });

  constructor(private heroService: HeroService, private weaponService: WeaponService) { }

  ngOnInit() {
    this.getHeroes();
    this.getWeapons();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  filtrerParNom() {
    if (this.triCroissantNom) {
      this.heroes.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.heroes.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.triCroissantNom = !this.triCroissantNom;
  }

  filtrerParCaracteristique(carac: string) {
    const triCroissantCarac = this.setTriCaracteristique(carac);
    if (triCroissantCarac) {
      this.heroes.sort((a, b) => {
        return a[carac] - b[carac];
      });
    } else {
      this.heroes.sort((a, b) => {
        return b[carac] - a[carac];
      });
    }
  }

  private setClassCSS(triCroissantCarac: boolean): string {
    if (triCroissantCarac === null) {
      return '';
    } else {
      return (triCroissantCarac ? 'fa fa-fw fa-sort-asc' : 'fa fa-fw fa-sort-desc');
    }
  }

  private setTriCaracteristique(carac: string): boolean {
    let res;
    switch (carac) {
      case 'attaque': {
        res = this.triCroissantAttaque;
        this.triCroissantAttaque = !this.triCroissantAttaque;
        break;
      }
      case 'esquive': {
        res = this.triCroissantEsquive;
        this.triCroissantEsquive = !this.triCroissantEsquive;
        break;
      }
      case 'degats': {
        res = this.triCroissantDegats;
        this.triCroissantDegats = !this.triCroissantDegats;
        break;
      }
      case 'pv': {
        res = this.triCroissantPV;
        this.triCroissantPV = !this.triCroissantPV;
        break;
      }
      case 'arme': {
        res = this.triCroissantArme;
        this.triCroissantArme = !this.triCroissantArme;
        break;
      }
    }
    return res;
  }

  getWeaponName(weaponId: string): string {
    let res;
    if (weaponId === 'No weapon') {
      res = weaponId;
    } else {
      res = this.weapons.find(e => e.id === weaponId).name;
    }
    return res;
  }

  deleteHero(hero: Hero) {
    this.heroService.deleteHero(hero.id);
  }

  filtrerArme() {
    this.heroesSauvegarde = this.heroes;
    this.heroes = this.heroes.filter(hero => hero.weaponId.includes(this.formFiltreArme.get('arme').value));
    this.filtreArme = true;
  }

  effacerFiltreArme() {
    this.heroes = this.heroesSauvegarde;
    this.filtreArme = false;
  }
}
