import {component$} from "@builder.io/qwik";
import {Form, routeAction$, z, zod$} from "@builder.io/qwik-city";
import prisma from "~/lib/prisma";
import bcrypt from "bcryptjs";

export const useCreateUser = routeAction$(
    async (data) => {
    data.password = await bcrypt.hash(data.password, 10);
        const user = await prisma.user.create({
            data,
        });
        return user;
    },
    zod$({
        name: z.string(),
        password: z.string(),
        // email: z.string().email(),
    }),
);

export default component$(() => {
    const createUserAction = useCreateUser();
    return (
        <section>
            <h1>Create User</h1>
            <Form action={createUserAction}>
                <label>
                    Name
                    <input name="name" value={createUserAction.formData?.get("name")}/>
                </label>
                <label>
                    Password
                    <input type={"password"} name="password" value={createUserAction.formData?.get("password")}/>
                </label>
                <button type="submit">Create</button>
            </Form>
            {createUserAction.value && (
                <div>
                    <h2>User created successfully!</h2>
                </div>
            )}
        </section>
    );
});
