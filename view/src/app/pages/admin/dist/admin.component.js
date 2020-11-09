"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminComponent = void 0;
var core_1 = require("@angular/core");
var AdminComponent = /** @class */ (function () {
    function AdminComponent() {
        this.ELEMENT_DATA = [
            { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
            { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
            { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
            { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
            { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
            { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
            { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
            { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
            { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
            { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
        ];
        this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
        this.dataSource = this.ELEMENT_DATA;
    }
    AdminComponent.prototype.ngOnInit = function () {
    };
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'app-admin',
            templateUrl: './admin.component.html',
            styleUrls: ['./admin.component.css']
        })
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
