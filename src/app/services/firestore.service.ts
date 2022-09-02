import {query} from '@angular/animations';
import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private cookieService: CookieService,private firestore: AngularFirestore) { }

  insert(collection_name: string, data: any): any{
    return this.firestore.collection(collection_name).add(data);
  }

  getDataByColumnName(collectionName:string, columnName:string, data:string):any{
    return this.firestore.collection(collectionName,query=>query.where(columnName,"==",data)).snapshotChanges();
    // db.subscribe((dbinfo:any)=>{
    //   dbinfo.map((response:any)=>{
    //     console.log(response.payload.doc.data());
        
    //   })
    // })
  }

  getDataById(collectionName:string, id:string):any{
    return this.firestore.collection(collectionName).doc(id).get();
  }

  deleteDataById(collectionName:string, id:string):any{
    return this.firestore.collection(collectionName).doc(id).delete();
  }

  updateDataById(collectionName:string, id:string, data:any):any{
    return this.firestore.collection(collectionName).doc(id).update(data);
  }
}
