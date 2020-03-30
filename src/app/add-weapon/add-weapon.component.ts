import {Component, DoCheck, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Weapon} from '../data/weapon';
import {WeaponService} from '../services/weapon.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-weapon',
  templateUrl: './add-weapon.component.html',
  styleUrls: ['./add-weapon.component.css']
})
export class AddWeaponComponent implements DoCheck, OnInit {
  ptsDisponibles: number;
  formWeapon = new FormGroup({
    name: new FormControl('', [Validators.required]),
    attaque: new FormControl('', [Validators.required, Validators.max(5), Validators.min(-5)]),
    esquive: new FormControl('', [Validators.required, Validators.max(5), Validators.min(-5)]),
    degats: new FormControl('', [Validators.required, Validators.max(5), Validators.min(-5)]),
    pv: new FormControl('', [Validators.required, Validators.max(5), Validators.min(-5)]),
  });

  constructor(private form: FormBuilder,  private weaponService: WeaponService, private router: Router) { }
  ngDoCheck(): void {
    this.ptsDisponibles = Math.abs(this.formWeapon.get('attaque').value + this.formWeapon.get('esquive').value
      + this.formWeapon.get('degats').value + this.formWeapon.get('pv').value);
  }
  ngOnInit() {
  }

  createWeapon() {
    const weapon = new Weapon();
    weapon.name = this.formWeapon.get('name').value;
    weapon.attaque = this.formWeapon.get('attaque').value;
    weapon.esquive = this.formWeapon.get('esquive').value;
    weapon.degats = this.formWeapon.get('degats').value;
    weapon.pv = this.formWeapon.get('pv').value;
    this.weaponService.addWeapon(weapon);
    this.router.navigate(['/weapons']);
  }

  isNewWeaponValid(): boolean {
    return this.ptsDisponibles === 0;
  }

}
