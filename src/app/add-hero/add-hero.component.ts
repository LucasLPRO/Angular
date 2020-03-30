import {Component, DoCheck, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Hero} from '../data/hero';
import {HeroService} from '../services/hero.service';
import {WeaponService} from '../services/weapon.service';
import {Router} from '@angular/router';
import {Weapon} from '../data/weapon';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css']
})
export class AddHeroComponent implements DoCheck, OnInit {
  ptsDisponibles: number;
  weapons: Weapon[];
  formHero = new FormGroup({
    name: new FormControl('', [Validators.required]),
    attaque: new FormControl('', [Validators.required, Validators.max(37), Validators.min(1)]),
    esquive: new FormControl('', [Validators.required, Validators.max(37), Validators.min(1)]),
    degats: new FormControl('', [Validators.required, Validators.max(37), Validators.min(1)]),
    pv: new FormControl('', [Validators.required, Validators.max(37), Validators.min(1)]),
    arme: new FormControl('', )
  });

  constructor(
    private form: FormBuilder,
    private heroService: HeroService,
    private router: Router,
    private weaponService: WeaponService
  ) {}
  ngDoCheck(): void {
    this.ptsDisponibles = 40 - (this.formHero.get('attaque').value + this.formHero.get('esquive').value
      + this.formHero.get('degats').value + this.formHero.get('pv').value);
  }
  ngOnInit() {
    this.getWeapons();
  }

  createHero() {
    const hero = new Hero();
    hero.name = this.formHero.get('name').value;
    hero.attaque = this.formHero.get('attaque').value;
    hero.esquive = this.formHero.get('esquive').value;
    hero.degats = this.formHero.get('degats').value;
    hero.pv = this.formHero.get('pv').value;
    hero.weaponId = this.formHero.get('arme').value;
    this.heroService.addHero(hero);
    this.router.navigate(['/heroes']);
  }

  isNewHeroValid(): boolean {
    return this.ptsDisponibles <= 40 && this.ptsDisponibles >= 0 && this.formHero.get('attaque').value > 0
      && this.formHero.get('esquive').value > 0 && this.formHero.get('degats').value > 0 || this.formHero.get('pv').value > 0;
  }
  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  getWeaponSelected(): Weapon {
    return this.weapons.find(e => e.id === this.formHero.get('arme').value);
  }
}
