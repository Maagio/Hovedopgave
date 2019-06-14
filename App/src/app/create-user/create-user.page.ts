import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Storage} from "@ionic/storage";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {

    public testNr = 0;
    public baseUrl = "http://localhost:5000/";
    public jsonData = [];
  constructor(private http: HttpClient, private  router: Router, private storage: Storage) {
      this.testNr = history.state.data;

  }
  ngOnInit() {
  }

  async CreateUser(email: string, password: string)
  {
      //console.log(this.testNr);
      this.storage.get("test").then((val) => {
          console.log(val);
      });
      let url = this.baseUrl + "api/Home/CreateUser";
      let userCheck = false as boolean;
      this.jsonData.push(email, password);

      await this.http.post<boolean>(url, JSON.stringify(this.jsonData),
          {headers: new HttpHeaders().set("Content-Type", "application/json")})
          .toPromise().then(result => {
              userCheck = result
          }, error => console.error(error));

      if(userCheck === true)
      {
          await this.router.navigate(["login"]);
          window.location.reload();
      }
      this.jsonData = [];
  }
  async GoBack()
  {
      await this.router.navigate(["login"]);
      window.location.reload();
  }
}
