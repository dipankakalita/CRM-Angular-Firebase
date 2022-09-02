import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  uploadSmallFile(file:any):any{
    const fileName = file.name;
    const fileref = this.storage.ref(fileName);
    const fileUploading = this.storage.upload(fileName,file)
    fileUploading.snapshotChanges().pipe(
      finalize(()=>{
        fileref.getDownloadURL().subscribe((URL:any)=>{
          console.log(URL);
          
        })
      }),
    ).subscribe();
  }
}
