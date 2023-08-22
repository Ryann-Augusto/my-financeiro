import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarModule } from "src/app/components/navbar/navbar.module";
import { SidebarModule } from "src/app/components/sidebar/sidebar.Module";
import { SistemaComponent } from "./sistema.component";
import { SistemaRoutingModule } from "./sistema-routing.module";

@NgModule({
    providers: [],
    declarations: [SistemaComponent],
    imports: [
        CommonModule,
        SistemaRoutingModule,
        NavbarModule,
        SidebarModule
    ],
})

export class SistemaModule{}