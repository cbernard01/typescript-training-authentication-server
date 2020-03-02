import 'reflect-metadata';
import {MetadataKeys, Methods} from "./MetadataEnums";
import {RouteHandlerDescriptor} from "../../interfaces/routeInterfaces";


function routeBinder(method: string) {
  return function (path: string): Function {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.Method, method, target, key);
      Reflect.defineMetadata(MetadataKeys.Path, path, target, key);
    }
  }
}

export const Get = routeBinder(Methods.Get);
export const Post = routeBinder(Methods.Post);
export const Put = routeBinder(Methods.Put);
export const Del = routeBinder(Methods.Del);
export const Patch = routeBinder(Methods.Patch);
