import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../services/token-storage.service";
import {UserService} from "../services/user.service";
import {User} from "../common/User";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUserFromToken: any;
  currentUserFromRepo:User = new User();

  constructor(private token: TokenStorageService,private userService: UserService) { }

  ngOnInit(): void
  {
    this.currentUserFromToken = this.token.getUser();
    this.getProfileData();

  }

  getProfileData()
  {
    this.userService.getUserByEmail(this.currentUserFromToken.email).subscribe(data=>
      {
        this.currentUserFromRepo = data;
        console.log(this.currentUserFromRepo);
      }
    );
  }

}
