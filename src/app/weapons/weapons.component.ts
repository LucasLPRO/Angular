import { Component, OnInit } from '@angular/core';

import { Weapon } from '../data/weapon';
import { WeaponService } from '../services/weapon.service';
import {Hero} from '../data/hero';
import {HeroService} from '../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {
  weapons: Weapon[];
  heroes: Hero[];
  triCroissantNom = null;
  triCroissantAttaque = null;
  triCroissantEsquive = null;
  triCroissantDegats = null;
  triCroissantPV = null;

  constructor(private weaponService: WeaponService, private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
    this.getWeapons();
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  filtrerParNom() {
    if (this.triCroissantNom) {
      this.weapons.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.weapons.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.triCroissantNom = !this.triCroissantNom;
  }

  filtrerParCaracteristique(carac: string) {
    const triCroissantCarac = this.setTriCaracteristique(carac);
    if (triCroissantCarac) {
      this.weapons.sort((a, b) => {
        return a[carac] - b[carac];
      });
    } else {
      this.weapons.sort((a, b) => {
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
    }
    return res;
  }

  deleteWeapon(weapon: Weapon) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.heroes.length; i++) {
      if (this.heroes[i].weaponId === weapon.id) {
        this.heroes[i].weaponId = 'No weapon';
        this.heroService.updateHero(this.heroes[i]);
      }
    }
    this.weaponService.deleteWeapon(weapon.id);
  }
}
