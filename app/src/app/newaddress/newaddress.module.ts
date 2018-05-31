import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { NewAddressComponent } from './newaddress.component';
import { HeroService } from '../services/hero.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [
    NewAddressComponent
  ],
  providers: [
    HeroService
  ],
  entryComponents: [NewAddressComponent]
})

export class NewAddressModule { }
