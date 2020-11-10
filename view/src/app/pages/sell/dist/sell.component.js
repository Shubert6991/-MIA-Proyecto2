"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SellComponent = void 0;
var core_1 = require("@angular/core");
var SellComponent = /** @class */ (function () {
    function SellComponent(fb, router) {
        this.fb = fb;
        this.router = router;
        this.productForm = this.fb.group({
            nombre: [''],
            descripcion: [''],
            pclaves: [''],
            precio: [''],
            categoria: ['']
        });
    }
    SellComponent.prototype.ngOnInit = function () {
    };
    SellComponent.prototype.isValidField = function (field) {
        return ((this.productForm.get(field).touched || this.productForm.get(field).dirty) &&
            !(this.productForm.get(field).valid));
    };
    SellComponent = __decorate([
        core_1.Component({
            selector: 'app-sell',
            templateUrl: './sell.component.html',
            styleUrls: ['./sell.component.css']
        })
    ], SellComponent);
    return SellComponent;
}());
exports.SellComponent = SellComponent;
