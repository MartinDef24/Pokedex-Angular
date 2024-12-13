import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {FooterComponent} from "./footer/footer.component";
import {AuthService} from "./auth.service";
import {NgIf} from "@angular/common";

@Component({
    selector: 'title-root',
    templateUrl: 'app.component.html',
    standalone: true,
    imports: [RouterOutlet, FooterComponent, NgIf],
})

export class AppComponent {
    loggedIn:Boolean = false;
    constructor(private authService: AuthService, private router:Router) {
        this.loggedIn = authService.isLoggedIn
    }

    logout() {
        this.authService.logout();
    }

    goToPokedex() {
        this.router.navigate(['/pokemons']);
    }

}
