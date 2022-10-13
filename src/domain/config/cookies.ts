import { NextPageContext } from "next"
import nookies from "nookies"

export const getCookies = (ctx: NextPageContext) => {
    return nookies.get(ctx)
};

export const setCookies = (ctx: NextPageContext, name: string, value: string) => {
    nookies.set(ctx, name, value, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
    })
};

export const destroyCookies = (ctx: NextPageContext, name: string) => {
    nookies.destroy(ctx, name)
}
