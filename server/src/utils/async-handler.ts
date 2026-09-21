import type {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from 'express';

type AsyncController<
    P = Record<string, string>,
    ResBody = unknown,
    ReqBody = unknown,
    ReqQuery = Record<string, string>,
> = (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction,
) => Promise<void>;

export const asyncHandler = <
    P = Record<string, string>,
    ResBody = unknown,
    ReqBody = unknown,
    ReqQuery = Record<string, string>,
>(
    controller: AsyncController<P, ResBody, ReqBody, ReqQuery>,
): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
    return (req, res, next) => {
        controller(req, res, next).catch(next);
    };
};