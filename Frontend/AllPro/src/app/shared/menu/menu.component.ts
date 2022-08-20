import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  activeIndex: number = 0;
  items2: MenuItem[] = [];
  items: MenuItem[] = [];
  userLogged: boolean = false;
  isAdministrator: boolean = false;

  constructor(private route:Router) {}

  ngOnInit() {
    if(localStorage.getItem('userLogged') === 'true') {
      this.userLogged = true;
      if (localStorage.getItem('isAdministrator') === 'true') {
        this.isAdministrator = true;
      }
    } else {
      this.userLogged = false;
    }
    this.validateLogin()
  }

  validateLogin() {
    if(this.userLogged) {
      this.items2 = [
        {
          label: '<img src="../../../assets/img/LogoHome.png" width="100" height="30">',
          escape: false,
          routerLink: '/welcome'
        },
        {
          label: 'Perfil',
          routerLink: '/profile',
          icon: 'pi pi-user'
        },
        {
          label: 'Usuarios',
          routerLink: '/users',
          icon: 'pi pi-users',
          visible: this.isAdministrator
        },
        {
          label: 'Arrendamientos',
          routerLink: '/arrendamientos',
          icon: 'pi pi-home',
        },
        {
          label: 'Venta',
          routerLink: '/ventas',
          icon: 'pi pi-dollar'
        }
      ];
    } else {
      this.items = [
        {
          label: '<img src="../../../assets/img/LogoHome.png" width="100" height="30">',
          escape: false,
          routerLink: '/'
        },
        {
          label: 'AllPro Inmobiliaria',
          items: [{ label: '¿Quiénes somos?', icon: 'pi pi-question', command: (event: any) => this.navegate(0,900), routerLink: '/' },
          { label: 'Misión y Visión', icon: 'pi pi-compass', command: (event: any) => this.navegate(0,1500), routerLink: '/'  },
          { label: '¿Cómo funciona?', icon: 'pi pi-star', command: (event: any) => this.navegate(0,2200), routerLink: '/'  },
          //TODO: Revisar contactenos navegate
          { label: 'Contáctenos', icon: 'pi pi-inbox', command: (event: any) => this.navegate(0,2600), routerLink: '/'  }
          ]
        },
        {
          label: 'Arrendamientos',
          routerLink: '/arrendamientos',
          icon: 'pi pi-home',
        },
        {
          label: 'Venta',
          routerLink: '/ventas',
          icon: 'pi pi-dollar'
        }
      ];
    }
  }

  navegate(x: number, y: number) {
    window.scroll(x, y);
  }

  Logout() {
    localStorage.removeItem('userLogged');
    localStorage.removeItem('isAdministrator');
    this.route.navigateByUrl('/');
  }
}
