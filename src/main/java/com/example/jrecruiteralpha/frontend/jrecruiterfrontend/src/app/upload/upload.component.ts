import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  SERVER_URL = "http://localhost:8080/api/profile/upload";
  uploadForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private token:TokenStorageService) { }

  ngOnInit(): void
  {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  onFileSelect(event:any)
  {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // @ts-ignore
      this.uploadForm.get('profile').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    // @ts-ignore
    formData.append('file', this.uploadForm.get('profile').value);
    let tokenInBrowser = this.token.getToken();
    // trzeba przekazać mu jeszcze użytkownika w jakiś sposób, albo token
    this.httpClient.post<any>(this.SERVER_URL, {formData, tokenInBrowser}).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

}
