import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';


@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(private http: HttpClient) {}

  createAndFetchPosts(postData: Post) {
    this.http
      .post<{ name: string }>(
        'https://ng-practice2.firebaseio.com//posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
}
