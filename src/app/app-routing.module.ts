import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import {WeaponsComponent} from './weapons/weapons.component';
import {WeaponDetailComponent} from './weapon-detail/weapon-detail.component';
import {AddHeroComponent} from './add-hero/add-hero.component';
import {AddWeaponComponent} from './add-weapon/add-weapon.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'addHero', component: AddHeroComponent},
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroDetail/:id', component: HeroDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'weapons', component: WeaponsComponent },
  { path: 'weaponDetail/:id', component: WeaponDetailComponent },
  { path: 'addWeapon', component: AddWeaponComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
