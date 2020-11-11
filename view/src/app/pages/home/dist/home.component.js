"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(authSvc, fb, catSvc, productsSvc) {
        this.authSvc = authSvc;
        this.fb = fb;
        this.catSvc = catSvc;
        this.productsSvc = productsSvc;
        this.User = null;
        this.searchForm = this.fb.group({
            categoria: [''],
            precio: [''],
            clave: ['']
        });
        this.subscription = new rxjs_1.Subscription();
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        //user info
        this.User = JSON.parse(localStorage.getItem('user')) || null;
        //categories
        this.subscription.add(this.catSvc.getCategorias().subscribe(function (res) {
            _this.categories = res;
        }));
        //palabras clave
        this.subscription.add(this.productsSvc.getPalabras().subscribe(function (res) {
            _this.pClaves = res;
        }));
        //productos
        this.subscription.add(this.productsSvc.getProductos().subscribe(function (res) {
            _this.allProductos = res;
        }));
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    HomeComponent.prototype.buscarProductos = function () {
        var _this = this;
        this.subscription.add(this.productsSvc.getFilteredProducts(this.searchForm.value).subscribe(function (res) {
            _this.allProductos = res;
        }));
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
