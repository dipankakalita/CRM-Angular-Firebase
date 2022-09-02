import {Component,OnInit} from '@angular/core';
import {AuthService} from './../services/auth.service';
import {menus} from './profile.menu';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public menus: any[] = menus;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  signOut(): void{
    this.auth.signOut();
  }

}
