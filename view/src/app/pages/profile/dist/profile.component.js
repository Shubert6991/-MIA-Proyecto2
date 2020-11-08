"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var paswordmatch_1 = require("../registro/paswordmatch");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(fb, router, registerService, profileService) {
        this.fb = fb;
        this.router = router;
        this.registerService = registerService;
        this.profileService = profileService;
        this.User = null;
        this.Countries = null;
        this.hide1 = true;
        this.hide2 = true;
        this.Image = "";
        this.emailRegex = /\S+@\S+\.\S+/;
        this.subscription = new rxjs_1.Subscription();
        this.profileInfo = this.fb.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.pattern(this.emailRegex)]],
            name: ['', [forms_1.Validators.required]],
            lastname: ['', [forms_1.Validators.required]],
            country: ['', [forms_1.Validators.required]],
            date: ['', [forms_1.Validators.required]],
            credits: ['']
        });
        this.profilePass = this.fb.group({
            pass: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            pass1: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            pass2: ['', [forms_1.Validators.required]]
        }, {
            validator: paswordmatch_1.MustMatch('pass1', 'pass2')
        });
        this.profilePic = this.fb.group({
            picture: ['', [forms_1.Validators.required]]
        });
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        //informacion de usuario
        this.User = JSON.parse(localStorage.getItem('user')) || null;
        // console.log(this.User);
        //llenar formularios
        this.subscription.add(this.registerService.getPaises().subscribe(function (res) {
            _this.Countries = res;
        }));
        this.profileInfo.setValue({
            email: this.User.correo,
            name: this.User.nombre,
            lastname: this.User.apellido,
            country: this.User.idPais,
            date: new Date(this.User.nacimiento),
            credits: this.User.credits
        });
        this.profilePass.setValue({
            pass: "contrasenauser",
            pass1: "",
            pass2: ""
        });
        //obtener imagen
        var infoPath = { "path": this.User.pathProfilePic };
        this.subscription.add(this.profileService.getPicture(infoPath).subscribe(function (res) {
            // console.log(res)
            _this.Image = res.image;
        }));
    };
    ProfileComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ProfileComponent.prototype.isValidProfileInfo = function (field) {
        return ((this.profileInfo.get(field).touched || this.profileInfo.get(field).dirty) &&
            !(this.profileInfo.get(field).valid));
    };
    ProfileComponent.prototype.isValidProfilePass = function (field) {
        return ((this.profilePass.get(field).touched || this.profilePass.get(field).dirty) &&
            !(this.profilePass.get(field).valid));
    };
    ProfileComponent.prototype.isValidProfilePic = function (field) {
        return ((this.profilePic.get(field).touched || this.profilePic.get(field).dirty) &&
            !(this.profilePic.get(field).valid));
    };
    //actuarlizar informacion del usuario
    ProfileComponent.prototype.updateInfo = function () {
        var _this = this;
        var fuinf = this.profileInfo.value;
        var fecha = fuinf.date.getDate() + "/" + (+fuinf.date.getMonth() + 1) + "/" + fuinf.date.getFullYear();
        var uinf = {
            uid: this.User.userId,
            name: fuinf.name,
            lastname: fuinf.lastname,
            country: fuinf.country,
            date: fecha
        };
        this.User.nombre = uinf.name;
        this.User.apellido = uinf.lastname;
        this.User.idPais = uinf.country;
        this.User.nacimiento = uinf.date;
        this.subscription.add(this.profileService.updateInfo(uinf).subscribe(function (res) {
            console.log(res);
            localStorage.setItem('user', JSON.stringify(_this.User));
        }));
    };
    //cambiar contraseña
    ProfileComponent.prototype.changePass = function () {
        var fupass = this.profilePass.value;
        var email = this.User.correo;
        var objUsr = {
            username: email,
            password: fupass.pass1
        };
        this.subscription.add(this.profileService.updatePass(objUsr).subscribe(function (res) {
            window.alert("Contraseña actualizada exitosamente");
        }));
    };
    //cambiar foto de perfil
    ProfileComponent.prototype.changeImage = function () {
        var _this = this;
        //create object
        var objPP = {
            uid: this.User.userId,
            email: this.User.correo,
            image: this.imageEncoded
        };
        //update database
        this.subscription.add(this.profileService.updateProfilePicture(objPP).subscribe(function (res) {
            _this.User.pathProfilePic = res.mensaje;
            localStorage.setItem('user', JSON.stringify(_this.User));
            // location.reload();
            var infoPath = { "path": _this.User.pathProfilePic };
            _this.subscription.add(_this.profileService.getPicture(infoPath).subscribe(function (res) {
                _this.Image = res.image;
            }));
        }));
    };
    ProfileComponent.prototype.handleUpload = function (event) {
        var _this = this;
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            _this.imageEncoded = reader.result;
        };
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.css']
        })
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
