import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
  }

  irAUsuario(): void {
    this.router.navigate(['/usuarios']);
  }

  irAMotor(): void {
    this.router.navigate(['/motor']);
  }
  irACaballos(): void {
    this.router.navigate(['/caballos']);
  }
  irACilindrada(): void {
    this.router.navigate(['/cilindrada']);
  }
  irACaja(): void {
    this.router.navigate(['/Caja']);
  }
  irACarburante(): void {
    this.router.navigate(['/Carburante']);
  }
  irAModelo(): void {
    this.router.navigate(['/modelo']);
  }
  irATraccion(): void {
    this.router.navigate(['/traccion']);
  }
  irACoche(): void {
    this.router.navigate(['/coche']);
  }
  irACesta(): void {
    this.router.navigate(['/cesta']);
  }
  irAPedido(): void {
    this.router.navigate(['/pedido']);
  }
}
