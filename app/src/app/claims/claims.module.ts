import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { ClaimsRoutingModule } from './claims-routing.module';
import { ClaimsComponent } from './claims.component';
import { ClaimsStore } from '../services/stores/claims.store';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    ClaimsRoutingModule
  ],
  declarations: [
    ClaimsComponent
  ],
  providers: [
    ClaimsStore
  ]
})
export class ClaimsModule { }
