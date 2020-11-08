"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("@env/environment");
var operators_1 = require("rxjs/operators");
var ProfileService = /** @class */ (function () {
    function ProfileService(http, router) {
        this.http = http;
        this.router = router;
    }
    ProfileService.prototype.getPicture = function (picture) {
        return this.http
            .post(environment_1.environment.API_URL + "/getPicture", picture)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ProfileService.prototype.updateInfo = function (data) {
        return this.http
            .post(environment_1.environment.API_URL + "/updateInfo", data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ProfileService.prototype.updatePass = function (data) {
        return this.http
            .post(environment_1.environment.API_URL + "/changeUserPass", data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ProfileService.prototype.updateProfilePicture = function (data) {
        return this.http
            .post(environment_1.environment.API_URL + "/changeUserPicture", data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ProfileService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;
