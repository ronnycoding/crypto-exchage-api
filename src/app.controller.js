"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AppController = void 0;
var common_1 = require("@nestjs/common");
var validation_pipe_1 = require("./validation.pipe");
var AppController = /** @class */ (function () {
    function AppController(appService) {
        this.appService = appService;
    }
    AppController.prototype.createPairs = function (createPairDto) {
        return this.appService.createPair(createPairDto);
    };
    AppController.prototype.getPairs = function () {
        return this.appService.getPairs();
    };
    __decorate([
        (0, common_1.Header)('Content-Type', 'application/json'),
        (0, common_1.HttpCode)(201),
        (0, common_1.Post)('pairs'),
        __param(0, (0, common_1.Body)(new validation_pipe_1.ValidationPipe()))
    ], AppController.prototype, "createPairs");
    __decorate([
        (0, common_1.Header)('Content-Type', 'application/json'),
        (0, common_1.HttpCode)(200),
        (0, common_1.Get)('pairs')
    ], AppController.prototype, "getPairs");
    AppController = __decorate([
        (0, common_1.Controller)()
    ], AppController);
    return AppController;
}());
exports.AppController = AppController;
