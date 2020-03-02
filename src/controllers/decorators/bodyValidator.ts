import "reflect-metadata";
import {MetadataKeys} from "./MetadataEnums";

export function BodyValidator(...keys: string[]): Function {
  return function(target: any, key: string, desc: PropertyDescriptor):void {
    Reflect.defineMetadata(MetadataKeys.Validator, keys, target, key);
  }
}
