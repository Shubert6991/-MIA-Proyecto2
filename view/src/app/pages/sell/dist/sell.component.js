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
var forms_1 = require("@angular/forms");
var Subscription_1 = require("rxjs/internal/Subscription");
var SellComponent = /** @class */ (function () {
    function SellComponent(fb, router, categorias, produtosSvc) {
        this.fb = fb;
        this.router = router;
        this.categorias = categorias;
        this.produtosSvc = produtosSvc;
        this.subscription = new Subscription_1.Subscription();
        this.pclaveRegex = /\w+(,\w+)*/;
        this.productForm = this.fb.group({
            nombre: ['', [forms_1.Validators.required]],
            descripcion: ['', [forms_1.Validators.required]],
            pclaves: ['', [forms_1.Validators.required, forms_1.Validators.pattern(this.pclaveRegex)]],
            precio: ['', [forms_1.Validators.required]],
            cantidad: ['', [forms_1.Validators.required]],
            categoria: ['', [forms_1.Validators.required]],
            picture: ['']
        });
    }
    SellComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.User = JSON.parse(localStorage.getItem('user')) || null;
        this.subscription.add(this.categorias.getCategorias().subscribe(function (res) {
            _this.Cats = res;
        }));
    };
    SellComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    SellComponent.prototype.isValidField = function (field) {
        if (field === 'cantidad' && this.productForm.get(field).touched) {
            if (this.productForm.get(field).value < 1)
                this.productForm.get(field).setValue(1);
        }
        return ((this.productForm.get(field).touched || this.productForm.get(field).dirty) &&
            !(this.productForm.get(field).valid));
    };
    SellComponent.prototype.handleUpload = function (event) {
        var _this = this;
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            _this.imageEncoded = reader.result;
        };
    };
    SellComponent.prototype.venderProducto = function () {
        var form = this.productForm.value;
        var producto = {
            nombre: form.nombre,
            description: form.descripcion,
            claves: form.pclaves,
            precio: form.precio,
            cantidad: form.cantidad,
            categoria: form.categoria,
            picture: this.imageEncoded,
            idUsuario: this.User.userId,
            correo: this.User.correo,
            pais: this.User.idPais
        };
        this.subscription.add(this.produtosSvc.addProducto(producto).subscribe(function (res) {
            console.log(res);
        }));
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
