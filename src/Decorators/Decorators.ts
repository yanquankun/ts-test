import "reflect-metadata";

const requiredMetadataKey = Symbol("required");

function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

function NotNull(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    let method = descriptor.value;
    descriptor.value = function () {
        let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName), errorInfo: string = "";
        if (requiredParameters) {
            for (let parameterIndex of requiredParameters) {
                if (arguments[parameterIndex] === "") {
                    errorInfo = "required argument can not empty string";
                }
            }
        }
        try {
            if (!errorInfo.length) {
                return method.apply(this, arguments);
            } else {
                throw new Error(errorInfo);
            }
        } catch (error) {
            return error;
        }
    }
}

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    let method = descriptor.value;
    descriptor.value = function () {
        let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName), errorInfo: string = "";
        if (requiredParameters) {
            for (let parameterIndex of requiredParameters) {
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                    errorInfo = "Missing required argument.";
                }
            }
        }
        try {
            if (!errorInfo.length) {
                return method.apply(this, arguments);
            } else {
                throw new Error(errorInfo);
            }
        } catch (error) {
            return error;
        }
    }
}
class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    @validate
    @NotNull
    greet(@required name: string, @required age: number | string) {
        return "Hello " + name + ", " + this.greeting + ", " + "age:" + age;
    }
}
const gt = new Greeter("greeting");
console.log(gt.greet('li', "123"));