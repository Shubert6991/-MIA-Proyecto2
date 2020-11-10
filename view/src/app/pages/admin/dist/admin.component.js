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
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var AdminComponent = /** @class */ (function () {
    function AdminComponent(fb, router, categorias) {
        this.fb = fb;
        this.router = router;
        this.categorias = categorias;
        this.ELEMENT_DATA = [];
        this.displayedColumns = ['id', 'nombre'];
        this.dataSource = this.ELEMENT_DATA;
        this.categoryForm = this.fb.group({
            nombre: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]]
        });
        this.subscriptions = new rxjs_1.Subscription();
    }
    AdminComponent.prototype.ngOnInit = function () {
        this.updateTable();
    };
    AdminComponent.prototype.updateTable = function () {
        var _this = this;
        this.subscriptions.add(this.categorias.getCategorias().subscribe(function (res) {
            _this.ELEMENT_DATA = res;
            _this.dataSource = _this.ELEMENT_DATA;
        }));
    };
    AdminComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    AdminComponent.prototype.nuevaCategoria = function () {
        var _this = this;
        console.log("agregando categoria");
        var form = this.categoryForm.value;
        this.subscriptions.add(this.categorias.addCategory(form).subscribe(function (res) {
            if (res)
                _this.updateTable();
        }));
    };
    AdminComponent.prototype.isValidField = function (field) {
        return ((this.categoryForm.get(field).touched || this.categoryForm.get(field).dirty) &&
            !(this.categoryForm.get(field).valid));
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
