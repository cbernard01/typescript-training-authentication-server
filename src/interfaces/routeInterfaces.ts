import {Request, RequestHandler} from "express";

export interface RequestWithBody extends  Request{
  body: {[key: string]: string | undefined};
}

export interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}
