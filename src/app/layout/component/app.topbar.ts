import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { Popover, PopoverModule } from 'primeng/popover';
import { SessionResponse, SessionService } from '../../common/services/sesion.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, PopoverModule],
    template: `
        <div class="layout-topbar">
            <div class="layout-topbar-logo-container">
                <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                    <i class="pi pi-bars"></i>
                </button>
                <a class="layout-topbar-logo" routerLink="/">
                    <svg version="1.1" viewBox="0 0 2000 2000" width="500" height="500" xmlns="http://www.w3.org/2000/svg">
                        <path transform="translate(0)" d="m0 0h2e3v2e3h-2e3z" fill="#07C0E2" />
                        <path
                            transform="translate(0)"
                            d="m0 0h1126v869l1 198-12 10-13 10-17 13-32 24-18 13-16 12-20 14-14 10-4 1v-480h-142l-134-1 1 647-5 4-96 48-28 13-14 6h-3l-1-273h-164l-111-1 1 310v71l-9 4-49 16-25 7-7-1-53-31-16-9-2-3 1-830 16-9 24-14 23-13 24-14 28-16 24-14 21-12 26-15 24-14 21-12 24-14 28-16 26-15 24-14 21-12 24-14 28-16 26-15 21-12 17-10 28-16 17-10 24-14 23-13 43-25 14-8 24-14 23-13 43-25 9-5 4 2 25 14 17 10 26 15 24 14 52 30 24 14 26 15 21 12 17 10 7 4v-87l-26-15-69-40-48-28-28-16-48-28-13-6-3-1h-14l-13 5-23 13-24 14-21 12-24 14-45 26-24 14-21 12-24 14-28 16-17 10-78 45-17 10-78 45-24 14-52 30-24 14-26 15-14 8-43 25-21 12-24 14-78 45-25 15-9 7-7 10-3 7-1 21v841l1 25 3 12 6 9 7 6 15 9 19 11 21 13 27 16 49 28 24 14 28 16 52 30 25 14 24 14 21 12 19 11 24 14 21 12 24 14 28 16 52 30 25 14 21 12 24 14 28 16 27 16 23 13 24 14 26 15 24 14 23 13 27 16 18 10 5 2v1h-834z"
                            fill="#094498"
                        />
                        <path
                            transform="translate(1402)"
                            d="m0 0h598v2e3h-1146l4-3 28-16 24-14 52-30 27-16 25-14 34-20 21-12 17-10 35-20 25-14 24-14 26-15 24-14 23-13 42-24 17-10 29-17 27-16 16-9 17-10 19-11 22-13 28-16 24-14 49-28 26-15 42-24 17-10 10-8 6-10 2-7 1-10v-412l1-178-13 13-9 11-14 15-11 12-16 17-11 12-1 153v337l-8 5-23 13-26 15-27 16-28 16-22 13-23 13-4 1v-482l2-5 17-16 8-8 8-7 8-8 8-7 9-9 8-7 9-9 8-7 22-22 7-8 16-16 7-8 11-11 7-8 20-20 7-8 7-7 7-8 12-14 14-15 10-13 12-15 9-11 10-13 10-12 7-9 12-15 11-14 9-12 11-15 26-36 9-13 11-16 7-10 16-24 14-22 12-19 9-15 13-22 8-13 5 1 25 13 22 12 30 16 14 8 3 1-4-121-7-221-3-97-1-5-24 15-23 14-42 26-26 16-19 12-23 14-40 25-39 24-19 12-20 12-14 9-26 16-24 15-26 16-10 6v2l25 13 22 12 23 12 23 13 11 6-1 5-7 10-14 23-13 20-26 39-16 23-8 11-14 19-21 28-13 18-8 11-13 16-11 14-9 10-8 10-9 11-12 14-9 11-10 11-9 11-14 15-7 8-5 6-4 2z"
                            fill="#094498"
                        />
                        <path transform="translate(1126)" d="m0 0h276v811l-12 13-11 12-8 9h-2l-2 4h-2l-2 4-56 56h-2l-2 4-8 7-8 8-8 7-10 10-8 7-9 9-8 7-13 12-8 7-11 10-11 9-14 12-9 7-14 12-10 8-14 12-9 7-5 1-1-196v-404z" fill="#89DA5C" />
                        <path transform="translate(705,693)" d="m0 0h273l3 1v481l-8 6-60 40-19 12-26 16-11 7-17 10-21 12-20 12-28 16-23 12-18 10-20 11-4 1-1-2z" fill="#89DA5C" />
                        <path
                            transform="translate(1400,1112)"
                            d="m0 0 3 1-1 483-8 5-28 16-15 9-49 28-45 26-17 10-84 48-24 14-1 1h-5l-1-155v-114l1-158 2-4 11-7 32-22 36-26 21-16 14-10 28-21 18-14 16-13 11-9 16-13 14-12 11-9 10-9h2v-2l10-8 11-10z"
                            fill="#89DA5C"
                        />
                        <path transform="translate(977,1417)" d="m0 0h4l1 2v418l-5 5-84 48-24 14-23 13h-5l-20-11-9-6-11-6-21-12-17-10-26-15-30-18-2-3v-281l15-7 35-16 18-8 19-9 54-27 19-10 20-10 22-12 30-16 24-14z" fill="#89DA5C" />
                        <path transform="translate(284,1137)" d="m0 0h275l1 1v274l-8 4-30 13-20 9-13 5-11 5-28 11-36 14-27 10-30 11-43 15-27 9h-2l-1-71z" fill="#89DA5C" />
                        <path transform="translate(1125,1325)" d="m0 0 2 1-1 158v114l1 156-5 4-52 30-24 14-52 30-11 6-2-1v-421l5-4 15-9 13-8 20-12 24-15 25-16 20-13 17-11z" fill="#094498" />
                        <path transform="translate(702,1556)" d="m0 0h3v281l-14-7-48-28-21-12-26-15-24-14-11-7-1-1v-139l12-5 51-20 48-20 28-12z" fill="#094498" />
                        <path transform="translate(557,1615)" d="m0 0 3 1v137l-16-8-16-9-11-6-17-10-11-6-16-9-24-14-21-12-12-7-6-3v-4l13-4 43-14 53-18z" fill="#89DA5C" />
                    </svg>
                    <span>{{session.agencia}}</span>
                </a>
            </div>

            <div class="layout-topbar-actions">
                <div class="layout-config-menu">
                    <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                        <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                    </button>
                </div>

                <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                    <i class="pi pi-ellipsis-v"></i>
                </button>

                <div class="layout-topbar-menu hidden lg:block">
                    <div class="layout-topbar-menu-content">
                        <button type="button" class="layout-topbar-action">
                            <i class="pi pi-calendar"></i>
                            <span>Calendar</span>
                        </button>
                        <button type="button" class="layout-topbar-action">
                            <i class="pi pi-inbox"></i>
                            <span>Messages</span>
                        </button>
                        <button (click)="togglePopover($event)" type="button" class="layout-topbar-action">
                            <i class="pi pi-user"></i>
                            <span>Profile</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <p-popover #op>
            <div class="flex flex-col gap-4">
                <div>
                    <span class="font-bold block mb-2">{{session.fullname}}</span>
                    <small class="block font-medium mb-2">{{session.usuario}}</small>
                    <ul class="list-none p-0 m-0 flex flex-col">
                        <li class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border" [routerLink]="['/auth/login']">
                            <div>
                                <span class="font-medium"><i class="pi pi-fw pi-power-off mr-1"></i> Cerrar sesión</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </p-popover>
    `
})
export class AppTopbar {
    @ViewChild('op') op!: Popover;
    session: SessionResponse
    items!: MenuItem[];

    constructor(public layoutService: LayoutService, private sessionService: SessionService) {
        this.session = this.sessionService.getSession();
        console.info(this.session)
    }

    togglePopover(event: any) {
        this.op.toggle(event);
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
