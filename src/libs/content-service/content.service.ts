import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {v4} from "uuid";
import {Endpoint, ENDPOINT_BASE, EndpointPaths} from "../model/endpoints";
import {Drink} from "../model/drink";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private selectedContent?: Drink;
  private contentList: Drink[] = [];

  constructor(private httpClient: HttpClient) {
    console.log('Loading content: ' + ENDPOINT_BASE + EndpointPaths.get(Endpoint.DRINKS));

    // Later revision add error handling with observables from rxjs
    this.httpClient.get<Drink[]>(ENDPOINT_BASE + EndpointPaths.get(Endpoint.DRINKS))
      .subscribe(resp => {
        this.contentList = resp;
        console.log('Response: ' + JSON.stringify(resp));
      });
  }

  addContent(addedContent: Drink) {
    addedContent.id = v4();
    // Would be a post call here to create it on the backend
    this.contentList.push(addedContent);
  }

  updateContent(contentEvent: Drink) {
    let idx: number = this.findIdxForContent(contentEvent);

    if (idx !== -1) {
      // Would be a put call here to update the existing content on the backend
      this.contentList[idx] = contentEvent;
    } else {
      this.addContent(contentEvent)
    }
    this.resetSelectedContent();
  }

  deleteContent(deletedContent: Drink) {
    let idx: number = this.findIdxForContent(deletedContent);

    if (idx !== -1) {
      // Would be a delete call here to delete it from the backend
      this.contentList.splice(idx, 1);
    }

    if (this.selectedContent && deletedContent.id === this.selectedContent.id) {
      this.selectedContent = undefined;
    }
  }

  getAllContent() : Drink[] {
    return this.contentList;
  }

  selectContent(contentEvent: Drink) {
    this.selectedContent = contentEvent;
  }
  getSelectedContent() : Drink | undefined {
    return this.selectedContent;
  }
  resetSelectedContent() {
    this.selectedContent = undefined;
  }

  private findIdxForContent(searchContent: Drink) : number {
    return this.contentList.findIndex(content => content.id === searchContent.id);
  }
}
