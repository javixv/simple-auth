import { Injectable } from '@angular/core';
import {getCookie,setCookie,removeCookie} from 'typescript-cookie'
//--Utilizando ng-cookie-service (no instalado) ------------------
//import { CookieService } from "ngx-cookie-service";
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    //private _cookies: CookieService
  ) { }

  saveToken(token: string) {
    //---guardar la token en localstotage----------------------------
    //localStorage.setItem('token', token);
    //--- guardar la token en cookie con typescript-cookie -----------
    setCookie('token-trello', token,{expires : 360, path : '/'});
    //--- guardar la token en cookie con ngx-cookie-service -----------
    //setToken(token: string) {this._cookies.set("token", token, 1, '/');
  }

  getToken() {
    //--- Obtener la token en localstotage----------------------------
    //const token = localStorage.getItem('token');
    //--- Obtener la token en cookie con typescript-cookie -----------
    const token = getCookie('token-trello');
    //--- Obtener la token en cookie con ngx-cookie-service -----------
    //const token = this._cookies.get("token");
    return token;
  }

  removeToken() {
    //--- Eliminar la token en localstotage----------------------------
    //localStorage.removeItem('token');
    //--- Eliminar la token en cookie con typescript-cookie -----------
    removeCookie('token-trello');
    //--- Eliminar la token en cookie con ngx-cookie-service -----------
    //this._cookies.delete("token");
  }
}
