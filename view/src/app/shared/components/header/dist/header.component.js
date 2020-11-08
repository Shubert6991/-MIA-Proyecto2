"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(authSvc, router) {
        this.authSvc = authSvc;
        this.router = router;
        this.subscription = new rxjs_1.Subscription();
        this.isAdmin = null;
        this.isLogged = false;
        this.toggleSidenav = new core_1.EventEmitter();
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription.add(this.authSvc.isLogged.subscribe(function (res) { return _this.isLogged = res; }));
        this.subscription.add(this.authSvc.isAdmin.subscribe(function (res) { return _this.isAdmin = res; }));
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    HeaderComponent.prototype.onToggleSidenav = function () {
        this.toggleSidenav.emit();
    };
    HeaderComponent.prototype.onLogout = function () {
        this.authSvc.logout();
    };
    __decorate([
        core_1.Output()
    ], HeaderComponent.prototype, "toggleSidenav");
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
