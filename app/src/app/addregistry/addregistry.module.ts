import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { AddRegistryComponent } from './addregistry.component';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    AddRegistryComponent
  ],
  providers: [
    ApiService
  ],
  entryComponents: [AddRegistryComponent]
})
export class AddRegistryModule { }
