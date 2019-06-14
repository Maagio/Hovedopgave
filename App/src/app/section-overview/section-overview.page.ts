import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {Base64} from "@ionic-native/base64/ngx";

@Component({
  selector: 'app-section-overview',
  templateUrl: './section-overview.page.html',
  styleUrls: ['./section-overview.page.scss'],
})
export class SectionOverviewPage implements OnInit {

    public sections: Section[] = [];
    //selectedFile: File;
    public test = "hej";
    public userId = 0;
    public baseUrl = "http://localhost:5000/";
    public jsonData = [];
    public hidden = false;

    constructor(private http: HttpClient, private router: Router, private storage: Storage, private  base64: Base64) {
        //this.userId = history.state.data;
        /*this.storage.get("userId").then((val) => {
            this.userId = val;
        });*/

    }
    async ngOnInit() {
        await this.storage.get("userId").then((val) => {
            this.userId = val;
        });

        await this.GetSections().then(() =>
            this.hidden = true);
        console.log(this.sections);
  }

  async CreateSection(name: string)
  {
    console.log(this.userId);
    let url = this.baseUrl + "api/Section/CreateSection";
    let userCheck = false as boolean;
    this.jsonData.push(this.userId, name);

    if (name != "") {
        await this.http.post<boolean>(url, JSON.stringify(this.jsonData),
            {headers: new HttpHeaders().set("Content-Type", "application/json")})
            .toPromise().then(result => {
                userCheck = result
            }, error => console.error(error));
    }

    if (userCheck === true)
      window.location.reload();
    this.jsonData = [];
  }

  async GetSections()
  {
      let url = this.baseUrl + "api/Section/GetSections";
      this.jsonData.push(this.userId);

      await this.http.post<Section[]>(url, JSON.stringify(this.jsonData),
          {headers: new HttpHeaders().set("Content-Type", "application/json")})
          .toPromise().then(result => {
              this.sections = result as Section[]
          }, error => console.error(error));
      //await console.log(this.sections);

      this.jsonData = [];
  }
  async GoToSection(section: Section)
  {
      await this.storage.set("section", section);
      this.router.navigate(["section"])
  }
  async Logout()
  {
    await this.router.navigate(["login"]);
    window.location.reload();
  }

    /*onFileChanged(event)
    {
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);
    }*/
   /* async ImageTest() {
        let url = this.baseUrl + "api/Section/SaveImage";
        //this.jsonData.push(this.selectedFile);
        let message = "" as string;
        //console.log(this.jsonData);
        let reader = new FileReader();
        let imageString = "";
        let me = this;
        let img = new Image();
        let test;
        //img.src = this.selectedFile;


        //let filePath: string = this.selectedFile;
        await reader.readAsDataURL(this.selectedFile);
        //await reader.readAsArrayBuffer(this.selectedFile);
        reader.onload = await function () {
            test = reader.result;
            var arrayBuffer = this.result,
                array = new Uint8Array(arrayBuffer),
                binaryString = String.fromCharCode.apply(null, array);
            //console.log(binaryString);
            //imageString = reader.readAsArrayBuffer(test);
            //let TYPED_ARRAY = new Uint8Array(test);
            //imageString = reader.result;
            console.log(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
        //reader.readAsArrayBuffer(this.selectedFile);
        //console.log();
        //this.jsonData.push(imageString);

        this.base64.encodeFile(filePath).then((base64File: string) => {
            console.log(base64File);
            }, (err) => {
            console.log(err);
        });

        let formData = new FormData();
        formData.append("Image", this.selectedFile, this.selectedFile.name);
        console.log(formData);
        await this.http.post<string>(url, formData,
            {headers: new HttpHeaders().set("Content-Type", "application/json")})
            .toPromise().then(result => {
                message = result
            }, error => console.error(error));

        await this.http.post<string>(url, JSON.stringify(this.jsonData),
            {headers: new HttpHeaders().set("Content-Type", "application/json")})
            .toPromise().then(result => {
                message = result
            }, error => console.error(error));

        if (message === "image saved")
            window.location.reload();
        else
            console.log(message);
    }*/
}
interface Section {
    sectionId: number;
    name: string;
    creationDate: string;
    userId: number;
}
