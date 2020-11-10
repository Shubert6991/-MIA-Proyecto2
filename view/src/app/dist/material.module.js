"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.MaterialModule = void 0;
var core_1 = require("@angular/core");
var toolbar_1 = require("@angular/material/toolbar");
var sidenav_1 = require("@angular/material/sidenav");
var button_1 = require("@angular/material/button");
var menu_1 = require("@angular/material/menu");
var list_1 = require("@angular/material/list");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var card_1 = require("@angular/material/card");
var datepicker_1 = require("@angular/material/datepicker");
var core_2 = require("@angular/material/core");
var select_1 = require("@angular/material/select");
var grid_list_1 = require("@angular/material/grid-list");
var badge_1 = require("@angular/material/badge");
var tabs_1 = require("@angular/material/tabs");
var table_1 = require("@angular/material/table");
var autocomplete_1 = require("@angular/material/autocomplete");
var myModules = [
    toolbar_1.MatToolbarModule,
    sidenav_1.MatSidenavModule,
    button_1.MatButtonModule,
    menu_1.MatMenuModule,
    list_1.MatListModule,
    icon_1.MatIconModule,
    input_1.MatInputModule,
    card_1.MatCardModule,
    datepicker_1.MatDatepickerModule,
    core_2.MatNativeDateModule,
    select_1.MatSelectModule,
    grid_list_1.MatGridListModule,
    badge_1.MatBadgeModule,
    tabs_1.MatTabsModule,
    table_1.MatTableModule,
    autocomplete_1.MatAutocompleteModule
];
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        core_1.NgModule({
            imports: __spreadArrays(myModules),
            exports: __spreadArrays(myModules)
        })
    ], MaterialModule);
    return MaterialModule;
}());
exports.MaterialModule = MaterialModule;
