import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './home/home.module';
import { ClaimsModule } from './claims/claims.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './services/api.service';
import { DialogModule } from './dialog/dialog.module';
import { ClaimsDialogModule } from './claimsdialog/ClaimsDialog.module';
import { NewAddressModule } from './newaddress/newaddress.module';
import { AddressStore } from './services/stores/address.store';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    HomeModule,
    ClaimsModule,
    LoginModule,
    AppRoutingModule,
    DialogModule,
    ClaimsDialogModule,
    NewAddressModule
  ],
  declarations: [AppComponent],
  providers: [
    ApiService,
    AddressStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
