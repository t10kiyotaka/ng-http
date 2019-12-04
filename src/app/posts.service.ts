import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


const url = 'https://ng-practice2.firebaseio.com//posts.json';

@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(private http: HttpClient) {}

  createAndStorePosts(postData: Post): void {
    this.http
      .post<{ name: string }>(url, postData)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  fetchPosts(): Observable<Post[]> {
    return this.http.get<{ [key: string]: Post }>(url)
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
      );
  }

  deletePosts(): Observable<Post[]> {
    return this.http.delete<Post[]>(url);
  }
}
