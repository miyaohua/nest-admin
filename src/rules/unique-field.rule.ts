import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * 唯一约束字段校验
 * @param property user(表名)
 * @param validationOptions {message:'xxx'}
 * @returns 
 */
export function IsUniqueField(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsUniqueField',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                async validate(value: any, args: ValidationArguments) {
                    return !await new PrismaService()[property].findFirst({
                        where: {
                            [propertyName]: value
                        }
                    })
                },
            },
        });
    }
}