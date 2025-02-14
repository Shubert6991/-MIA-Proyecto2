"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SellModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var sell_routing_module_1 = require("./sell-routing.module");
var sell_component_1 = require("./sell.component");
var material_module_1 = require("@app/material.module");
var forms_1 = require("@angular/forms");
var SellModule = /** @class */ (function () {
    function SellModule() {
    }
    SellModule = __decorate([
        core_1.NgModule({
            declarations: [sell_component_1.SellComponent],
            imports: [
                common_1.CommonModule,
                sell_routing_module_1.SellRoutingModule,
                material_module_1.MaterialModule,
                forms_1.ReactiveFormsModule
            ]
        })
    ], SellModule);
    return SellModule;
}());
exports.SellModule = SellModule;
