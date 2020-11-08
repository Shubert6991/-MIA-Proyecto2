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
exports.RecoverpassComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var paswordmatch_1 = require("../registro/paswordmatch");
var RecoverpassComponent = /** @class */ (function () {
    function RecoverpassComponent(route, fb, router, authSvc) {
        this.route = route;
        this.fb = fb;
        this.router = router;
        this.authSvc = authSvc;
        this.subscription = new rxjs_1.Subscription();
        this.hide1 = true;
        this.hide2 = true;
        this.Email = "";
        this.recoverForm = this.fb.group({
            email: ['', [forms_1.Validators.required]],
            pass1: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            pass2: ['', [forms_1.Validators.required]]
        }, {
            validator: paswordmatch_1.MustMatch('pass1', 'pass2')
        });
    }
    RecoverpassComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription.add(this.route.params.subscribe(function (params) {
            console.log('The id of this route is: ', params.id);
            _this.Email = atob(params.id);
        }));
        this.recoverForm.setValue({
            email: this.Email,
            pass1: "",
            pass2: ""
        });
    };
    RecoverpassComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    RecoverpassComponent.prototype.isValidField = function (field) {
        return ((this.recoverForm.get(field).touched || this.recoverForm.get(field).dirty) && !(this.recoverForm.get(field).valid));
    };
    RecoverpassComponent.prototype.recover = function () {
        var _this = this;
        //enviar datos a api
        var _a = this.recoverForm.value, pass2 = _a.pass2, rest = __rest(_a, ["pass2"]);
        this.subscription.add(this.authSvc.changePass(rest).subscribe(function (res) {
            window.alert("Contraseña actualizada exitosamente");
            _this.router.navigate(['login']);
        }));
    };
    RecoverpassComponent = __decorate([
        core_1.Component({
            selector: 'app-recoverpass',
            templateUrl: './recoverpass.component.html',
            styleUrls: ['./recoverpass.component.css']
        })
    ], RecoverpassComponent);
    return RecoverpassComponent;
}());
exports.RecoverpassComponent = RecoverpassComponent;
