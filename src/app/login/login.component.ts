import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [FormsModule, NgIf],
})
export class LoginComponent implements OnInit {
  message: string = "les identifiants de connexion sont : pika/pika"
  name: string;
  password: string;
  auth: AuthService

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.auth = this.authService
  }

  login() {
    this.message = 'tentative de connexion en cours...';
    this.authService.login(this.name, this.password).subscribe(
      (isLoggedIn:boolean) => {
        if(isLoggedIn) {
          this.router.navigate(['/pokemons']);
        } else {
          this.password = '';
          this.router.navigate(['/login']);
        }
      }
    )
  }

  logout() {
    this.authService.logout();
    this.message = "Vous êtes déconnecté (pika/pika)";
  }
}
