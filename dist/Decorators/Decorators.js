"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var requiredMetadataKey = Symbol("required");
function required(target, propertyKey, parameterIndex) {
    var existingRequiredParameters = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}
function NotNull(target, propertyName, descriptor) {
    var method = descriptor.value;
    descriptor.value = function () {
        var requiredParameters = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName), errorInfo = "";
        if (requiredParameters) {
            for (var _i = 0, requiredParameters_1 = requiredParameters; _i < requiredParameters_1.length; _i++) {
                var parameterIndex = requiredParameters_1[_i];
                if (arguments[parameterIndex] === "") {
                    errorInfo = "required argument can not empty string";
                }
            }
        }
        try {
            if (!errorInfo.length) {
                return method.apply(this, arguments);
            }
            else {
                throw new Error(errorInfo);
            }
        }
        catch (error) {
            return error;
        }
    };
}
function validate(target, propertyName, descriptor) {
    var method = descriptor.value;
    descriptor.value = function () {
        var requiredParameters = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName), errorInfo = "";
        if (requiredParameters) {
            for (var _i = 0, requiredParameters_2 = requiredParameters; _i < requiredParameters_2.length; _i++) {
                var parameterIndex = requiredParameters_2[_i];
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                    errorInfo = "Missing required argument.";
                }
            }
        }
        try {
            if (!errorInfo.length) {
                return method.apply(this, arguments);
            }
            else {
                throw new Error(errorInfo);
            }
        }
        catch (error) {
            return error;
        }
    };
}
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function (name, age) {
        return "Hello " + name + ", " + this.greeting + ", " + "age:" + age;
    };
    tslib_1.__decorate([
        validate,
        NotNull,
        tslib_1.__param(0, required), tslib_1.__param(1, required),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], Greeter.prototype, "greet", null);
    return Greeter;
}());
var gt = new Greeter("greeting");
console.log(gt.greet('li', ""));
//# sourceMappingURL=Decorators.js.map