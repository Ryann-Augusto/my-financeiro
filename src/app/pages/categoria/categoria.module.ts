import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarModule } from "src/app/components/navbar/navbar.module";
import { SidebarModule } from "src/app/components/sidebar/sidebar.Module";
import { CategoriaComponent } from "./categoria.component";
import { CategoriaRoutingModule } from "./categoria-routing.module";

@NgModule({
    providers: [],
    declarations: [CategoriaComponent],
    imports: [
        CommonModule,
        CategoriaRoutingModule,
        NavbarModule,
        SidebarModule
    ],
})

export class CategoriaModule{}