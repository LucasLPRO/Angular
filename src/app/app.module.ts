import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import { WeaponsComponent } from './weapons/weapons.component';
import { WeaponDetailComponent } from './weapon-detail/weapon-detail.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { AddHeroComponent } from './add-hero/add-hero.component';
import { AddWeaponComponent } from './add-weapon/add-weapon.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    WeaponsComponent,
    WeaponDetailComponent,
    AddHeroComponent,
    AddWeaponComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        NgbPaginationModule,
        NgbAlertModule,
        // AngularFireAnalyticsModule, // dynamically imports firebase/analytics
        AngularFirestoreModule,
        ReactiveFormsModule,
        // imports firebase/firestore, only needed for database features
        // AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
        // AngularFireStorageModule // imports firebase/storage only needed for storage features
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
