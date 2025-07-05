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
                    <img [src]="session.logoAgencia" style="max-width: 50px;" crossorigin="anonymous" loading="lazy" />
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
    }

    togglePopover(event: any) {
        this.op.toggle(event);
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
