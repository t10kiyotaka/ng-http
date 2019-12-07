import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { catchError, map } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';


const url = 'https://ng-practice2.firebaseio.com//posts.json';

@Injectable({providedIn: 'root'})
export class PostsService {
  errorSub = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePosts(postData: Post): void {
    this.http
      .post<{ name: string }>(url, postData).subscribe(responseData => {
      console.log(responseData);
    }, error => {
      this.errorSub.next(error);
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
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }

  deletePosts(): Observable<Post[]> {
    return this.http.delete<Post[]>(url);
  }
}
