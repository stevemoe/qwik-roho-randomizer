import {component$} from "@builder.io/qwik";
import {routeLoader$} from "@builder.io/qwik-city";
import prisma from "~/lib/prisma";

export const useGetUser = routeLoader$(async ({params, status}) => {
    const userId = params.userId;
    const user = await prisma.user.findUnique({where: {id: userId}});
    if (!user) {
        // Set the status to 404 if the user is not found
        status(404);
    }
    return user;
});

export default component$(() => {
    const user = useGetUser();
    return (
        <section>
            <h1>User detail</h1>
            {user.value ? (
                <>
                    <p>Name: {user.value.name}</p>
                    <p>Email: {user.value.email}</p>
                </>
            ) : (
                <p>User not found</p>
            )}
        </section>
    );
});
