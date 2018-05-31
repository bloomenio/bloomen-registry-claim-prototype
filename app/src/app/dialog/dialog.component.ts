import { Component, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../services/hero.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
/**
 * És el dialeg que s'obre quan premem el boto en forma de triangle de home.html
 */
export class DialogComponent {

  public submitted: boolean = false;
  public nametext: string = "";
  public types = ['Smart', 'Flexible',
            'Nice', 'Selfish'];
  public alterego: string = "";
  public type:string = "";

  

  constructor(private dialogRef: MatDialogRef<DialogComponent>, private heroService: HeroService, @Inject(MAT_DIALOG_DATA) public data: any)
  {}

  /**
   * S'encarrega de tancar el dialeg obert
   */
  close() {
    this.dialogRef.close();
  }

  /**
   * Quan s'omple el formulari és fa submit les dades es recullen i es mostren al dialeg, a més es fa una crida a l'api a un metode qualsevol
   * ja que aquesta api no es la corresponent
   */
  onSubmit() {
    this.submitted = true;
    this.heroService.getForm(this.nametext, this.alterego, this.type)
          .then(
            (result: any) => {
              console.log(result);
            },
            (error) => {
              console.error(error);
            }
          );
  }

}
