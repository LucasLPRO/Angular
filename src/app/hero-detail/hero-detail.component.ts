import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../data/hero';
import { HeroService } from '../services/hero.service';
import {Weapon} from '../data/weapon';
import {WeaponService} from '../services/weapon.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  weapons: Weapon[];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private weaponService: WeaponService
  ) {}

  ngOnInit(): void {
    this.initHero();
    this.getWeapons();
  }

  initHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  estValideFormulaire(nb, atq, esq, dgt, pv): void {
    if (nb > 40 || nb < 0 || atq < 1 || esq < 1 || dgt < 1 || pv < 1) {
      (document.getElementById('btn-enregistrer') as HTMLInputElement).disabled = true;
    } else {
      (document.getElementById('btn-enregistrer') as HTMLInputElement).disabled = false;
    }
  }
  getPointsDisponibles(nb): number {
    if (nb < 0) {
      nb = 0;
    } else if (nb > 40) {
      nb = 40;
    }
    return nb;
  }

  save() {
    this.heroService.updateHero(this.hero);
  }
  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }
}
