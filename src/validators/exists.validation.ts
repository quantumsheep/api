import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { getManager } from 'typeorm';

// Define validator class
@ValidatorConstraint({ async: true })
export class ExistsInDatabaseExistConstraint implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments) {
        const entity = args.object[`class_entity_${args.property}`];
        return getManager()
            .count(entity, { [args.property]: value })
            .then((count) => count > 0); // Returns true if entity is found
    }
}

// Define decorator wrapper for above validator
export function Exists(entity: Function, validationOptions?: ValidationOptions) {
    validationOptions = { ...{ message: '$property $value not found' }, ...validationOptions };

    return function (object: Record<string, any>, propertyName: string) {
        object[`class_entity_${propertyName}`] = entity;
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: ExistsInDatabaseExistConstraint,
        });
    };
}
