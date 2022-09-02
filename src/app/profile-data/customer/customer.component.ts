import {Component,OnInit} from '@angular/core';
import {MatDialog,MatDialogRef} from '@angular/material/dialog';
import {FormBuilder,Validator} from '@angular/forms';
import {FirestoreService} from './../../services/firestore.service';
import {StorageService} from './../../services/storage.service';
import {CookieService} from 'ngx-cookie-service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  currentDialog: any;
  userId:string = '';
  imageArea:boolean = false;
  constructor(private storage: StorageService,private _snackBar: MatSnackBar, private cookieService: CookieService, public dialog: MatDialog,private fb: FormBuilder,private firestore: FirestoreService) { }

  public addCustomerRecord = this.fb.group({
    c_name: ['sa'],
    email: ['d@g.com'],
    mobile: ['12345'],
    city: ['ngon'],
    state: ['ass'],
    country: ['ind'],
    pincode: ['782142'],
    address: ['maj'],
    merchant_id: [this.cookieService.get('userId')]
  });

  ngOnInit(): void {
    this.userId  = this.cookieService.get('userId');
    this.firestore.getDataByColumnName("customers","merchant_id",this.userId);
  }

  customerDialog(el: any): void{
    this.currentDialog = this.dialog.open(el)
  }

  addCustomer(): void {
    const customer = this.firestore.insert("customers",this.addCustomerRecord.value);
    customer.then(()=>{
      this.imageArea = true;
      // this.currentDialog.close();
      // this.openSnackBar("Record Added Successfully", 'close')
    })
    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  uploadCustomerPic():void{
    // this.storage.uploadSmallFile(input.files[0]);
  }
}
