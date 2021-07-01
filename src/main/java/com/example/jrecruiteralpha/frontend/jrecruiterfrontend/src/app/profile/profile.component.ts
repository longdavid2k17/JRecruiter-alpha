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
    console.log(this.currentUserFromRepo);
  }

  getProfileData()
  {
    this.userService.getUserByEmail(this.currentUserFromToken.email).subscribe(data=>
      {
        //console.log(data);
        this.currentUserFromRepo.id=data.id;
        this.currentUserFromRepo.name=data.name;
        this.currentUserFromRepo.username=data.username;
        this.currentUserFromRepo.surname=data.surname;
        this.currentUserFromRepo.profileImgUrl=data.profileImgUrl;
        this.currentUserFromRepo.phoneNumber=data.phoneNumber;
        this.currentUserFromRepo.email=data.email;}
    );
  }

}
