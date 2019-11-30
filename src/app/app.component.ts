import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post(
        'https://ng-practice2.firebaseio.com//posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http.get('https://ng-practice2.firebaseio.com//posts.json')
      .pipe(
        map(postData => {
          const postArray = [];
          for (const key in postData) {
            if (postData.hasOwnProperty(key)) {
              postArray.push({...postData[key], id: key});
            }
          }
          return postArray;
        })
      )
      .subscribe(posts => {
        console.log(posts);
      });
  }
}
