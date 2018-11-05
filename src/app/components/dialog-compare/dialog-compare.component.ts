import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-dialog-compare',
  templateUrl: './dialog-compare.component.html',
  styleUrls: ['./dialog-compare.component.css']
})
export class DialogCompareComponent {

  cars: Car[] = [];

  constructor(public dialogRef: MatDialogRef<DialogCompareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Car[]) {
    data = this.orderByPriceAsc(data);
  }

  back() {
    this.dialogRef.close();
  }

  getAvatar(url: string) {
    return "url('" + url + "')";
  }

  orderByPriceAsc(array: any) {
    return array.sort(
      function compare(a, b) {
        if (a.price < b.price)
          return -1;
        if (a.price > b.price)
          return 1;
        return 0;
      });
  }

}
