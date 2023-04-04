import { MiddlewareFn } from "type-graphql";

export const ErrorsInterceptor: MiddlewareFn<any> = async (
  { context, info },
  next
) => {
  try {
    return await next();
  } catch (err) {
    console.log("passei por aqui");

    return {
      message: "Leonardo Oliveira",
    };

    throw err;
  }
};
