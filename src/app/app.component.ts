import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient,
              private postsService: PostsService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postsService.createAndFetchPosts(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;
    this.http.get<{ [key: string]: Post }>(
      'https://ng-practice2.firebaseio.com//posts.json'
    )
    .pipe(
      map(postData => {
        const postArray: Post[] = [];
        for (const key in postData) {
          if (postData.hasOwnProperty(key)) {
            postArray.push({...postData[key], id: key});
          }
        }
        return postArray;
      })
    )
    .subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }
}
