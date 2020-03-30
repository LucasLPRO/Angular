import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Weapon } from '../data/weapon';
import { WeaponService } from '../services/weapon.service';

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: [ './weapon-detail.component.css' ]
})
export class WeaponDetailComponent implements OnInit {
  weapon: Weapon;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.initHero();
  }

  initHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.weaponService.getWeapon(id)
      .subscribe(weapon => this.weapon = weapon);
  }

  goBack(): void {
    this.location.back();
  }

  estValideFormulaire(nb, atq, esq, dmg, pv, name): void {
    if (nb !== 0 || atq === null || esq === null || dmg === null || pv === null || name === '') {
      (document.getElementById('btn-enregistrer') as HTMLInputElement).disabled = true;
    } else {
      (document.getElementById('btn-enregistrer') as HTMLInputElement).disabled = false;
    }
  }
  getPointsDisponibles(nb): number {
    return Math.abs(nb);
  }

  save() {
    this.weaponService.updateWeapon(this.weapon);
  }
}
