"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("@env/environment");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var angular_jwt_1 = require("@auth0/angular-jwt");
var helper = new angular_jwt_1.JwtHelperService();
var AuthService = /** @class */ (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
        this.logged = new rxjs_1.BehaviorSubject(false);
        this.role = new rxjs_1.BehaviorSubject(null);
        this.checkToken();
    }
    Object.defineProperty(AuthService.prototype, "isLogged", {
        get: function () {
            return this.logged.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "isAdmin", {
        get: function () {
            return this.role.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    AuthService.prototype.login = function (authData) {
        var _this = this;
        return this.http
            .post(environment_1.environment.API_URL + "/login", authData)
            .pipe(operators_1.map(function (res) {
            if (res.mensaje === "Exito") {
                _this.saveLocal(res);
                _this.logged.next(true);
                _this.role.next(res.tipo);
                return res;
            }
            else {
                window.alert("Usuario o contraseña incorrectos");
            }
        }), operators_1.catchError(function (err) { return _this.handleError(err); }));
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('user');
        this.logged.next(false);
        this.role.next(null);
        this.router.navigate(['login']);
    };
    AuthService.prototype.checkToken = function () {
        var user = JSON.parse(localStorage.getItem('user')) || null;
        if (user) {
            var isExpired = helper.isTokenExpired(user.token);
            if (isExpired) {
                this.logout();
            }
            else {
                this.logged.next(true);
                this.role.next(user.tipo);
            }
        }
    };
    AuthService.prototype.saveLocal = function (user) {
        var mensaje = user.mensaje, rest = __rest(user, ["mensaje"]);
        localStorage.setItem('user', JSON.stringify(rest));
    };
    AuthService.prototype.handleError = function (err) {
        var errorMessage = "Ocurrio un error al tratar de obtener datos";
        if (err) {
            errorMessage = "Error: code " + err.message;
        }
        window.alert(errorMessage);
        return rxjs_1.throwError(errorMessage);
    };
    AuthService.prototype.recoverPass = function (recoverData) {
        return this.http
            .post(environment_1.environment.API_URL + "/recoverPass", recoverData)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    AuthService.prototype.changePass = function (data) {
        return this.http
            .post(environment_1.environment.API_URL + "/changePass", data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
