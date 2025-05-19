import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { AuthService } from './service/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'audi';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.changeBodyBgColor(event.urlAfterRedirects);
    });
  }

  changeBodyBgColor(url: string): void {
    if (url === '/usuarios') {
      document.body.style.backgroundColor = '#212529';

    } else {
      document.body.style.backgroundColor = ''; // Restaurar a color por defecto o el que prefieras
    }
  }

  //@HostListener('window:beforeunload', ['$event'])
  //unloadNotification($event: any): void {
  //  this.authService.logout();
  //}
}
