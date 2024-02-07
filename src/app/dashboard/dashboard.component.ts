import { Component } from '@angular/core';
import {ListComponent} from "../list/list.component";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ContentService} from "../../libs/content-service/content.service";
import {DetailComponent} from "../detail/detail.component";
import {NgIf} from "@angular/common";
import {AuthService} from "../../libs/auth-service/auth.service";
import {UnauthorizedComponent} from "../unauthorized/unauthorized.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ListComponent,
    MatButton,
    MatIcon,
    MatMiniFabButton,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatToolbar,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    DetailComponent,
    NgIf,
    UnauthorizedComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(public readonly contentService: ContentService,
              public readonly authService: AuthService) {}
}
