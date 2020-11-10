"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ServicioService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("@env/environment");
var operators_1 = require("rxjs/operators");
var ServicioService = /** @class */ (function () {
    function ServicioService(http, router) {
        this.http = http;
        this.router = router;
    }
    ServicioService.prototype.getCategorias = function () {
        return this.http
            .get(environment_1.environment.API_URL + "/getCategorias")
            .pipe(operators_1.map(function (res) {
            console.log(res);
            return res;
        }));
    };
    ServicioService.prototype.addCategory = function (data) {
        console.log(data);
        return this.http
            .post(environment_1.environment.API_URL + "/admin/addCategoria", data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ServicioService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ServicioService);
    return ServicioService;
}());
exports.ServicioService = ServicioService;
