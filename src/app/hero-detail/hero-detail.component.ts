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
  heroWeapon: Weapon;
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
      .subscribe(hero => {
        this.hero = hero;
        this.weaponService.getWeapon(this.hero.weaponId)
          .subscribe(heroWeapon => this.heroWeapon = heroWeapon);
      });
  }

  goBack(): void {
    this.location.back();
  }

  // Vérifie que le formulaire est valide
  estValideFormulaire(nb): boolean {
    return (nb > 40 || nb < 0 || this.hero.attaque < 1 || this.hero.esquive < 1 || this.hero.degats < 1
      || this.hero.pv < 1 || this.hero.name === '');
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

  getWeaponSelected(): Weapon {
    return this.weapons.find(e => e.id === this.hero.weaponId);
  }
}
