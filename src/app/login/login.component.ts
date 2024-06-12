import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [FormsModule],
})
export class LoginComponent implements OnInit {
  message: string = "Vous êtes déconnecté (pika/pika)"
  name: string;
  password: string;
  auth: AuthService

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.auth = this.authService
  }

  setMessage() {
    if(this.authService.isLoggedIn) {
      this.message = 'vous êtes connecté';
    } else {
      this.message = 'Identifiant ou password incorrect';
    }
  }

  login() {
    this.message = 'tentative de connexion en cours...';
    this.authService.login(this.name, this.password).subscribe(
      (isLoggedIn:boolean) => {
        this.setMessage();
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
