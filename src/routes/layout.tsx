import {component$, Slot} from "@builder.io/qwik";
import type {RequestHandler} from "@builder.io/qwik-city";
import Header from "~/components/header";

export const onGet: RequestHandler = async ({cacheControl}) => {
    // Control caching for this request for best performance and to reduce hosting costs:
    // https://qwik.builder.io/docs/caching/
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 5,
    });
};

// export const onRequest: RequestHandler = (event) => {
//     const session: Session | null = event.sharedMap.get('session');
//     if (!session || new Date(session.expires) < new Date()) {
//         throw event.redirect(302, `/api/auth/signin?callbackUrl=${event.url.pathname}`);
//     }
// };

export default component$(() => {
    return (
        <div>
            <Header/>
            <Slot/>
        </div>);
});
