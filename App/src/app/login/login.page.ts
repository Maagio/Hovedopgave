import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public baseUrl = "http://localhost:5000/";
  public jsonData = [];
  constructor(private http: HttpClient, private router: Router, private storage: Storage) {
  }
ngOnInit() {
  }

  async Login(email: string, password: string)
  {

    let url = this.baseUrl + "api/Home/Login";
    let userId = 0 as number;
    this.jsonData.push(email, password);

    await this.http.post<number>(url, JSON.stringify(this.jsonData),
        {headers: new HttpHeaders().set("Content-Type", "application/json")})
        .toPromise().then(result => {
          userId = result
        }, error => console.error(error));

    if(userId != 0)
    {
        await this.storage.set("userId", userId);
        await this.router.navigate(["section-overview"], {state: {data: userId}});
        //window.location.reload();
    }
    else {
      //window.location.reload();
        // Error message
    }
    this.jsonData = [];
  }

  CreateUser()
  {
    this.router.navigate(["create-user"], {state: {data: 4}})
    //this.router.navigate(["create-user"], {queryParams: {example: "4"}});
  }

}
