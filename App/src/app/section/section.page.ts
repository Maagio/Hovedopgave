import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-section',
  templateUrl: './section.page.html',
  styleUrls: ['./section.page.scss'],
})
export class SectionPage implements OnInit {

  public sectionId = 0;
  public section: Section;
  constructor(private http: HttpClient, private router: Router, private storage: Storage) { }

  async ngOnInit() {
      await this.storage.get("section").then((val) => {
          this.section = val;
      });
      //console.log(this.section);
  }

}
interface Section {
    sectionId: number;
    name: string;
    sectionCreationDate: string;
    userId: number;
}
