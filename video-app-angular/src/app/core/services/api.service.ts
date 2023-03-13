import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { generateFetchParameters } from 'src/app/shared/utils/api-utils';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }


  public getVideo = (url: string) => {
    const data = generateFetchParameters(url);
    if(!data) return;
    
    const { path, headers } = data as { path: string; headers?: HttpHeaders };
    
    return this.http.get( path, { headers } ).subscribe( response => {
      console.log('resp' , response)
    } )
  }
}
