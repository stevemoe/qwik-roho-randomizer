import {component$} from "@builder.io/qwik";
import {Link, useLocation} from "@builder.io/qwik-city";
import {useAuthSession, useAuthSignout} from "~/routes/plugin@auth";
import styles from "./header.module.css";

export const leftCSS = `
    .bold {
        font-weight: bold;
    }
    `;

export default component$(() => {
    const loc = useLocation();
    const isActive: (pathname: string) => boolean = (pathname) => loc.url.pathname === pathname;

    const session = useAuthSession();

    const signOut = useAuthSignout();

    let left = (

        <div class={styles.left}>
            <Link class={[styles.title, styles.bold]} href="/public"  data-active={isActive('/')}>
                    Rosenhof <br/> Randomizer
            </Link>
        </div>
    );



    let right = null;


    if (!session.value) {
        right = (
            <div class={styles.right}>
                <div class={styles.flex}>
                    <Link class={styles.a} href="/create" data-active={isActive('/signup')}>Sign up
                    </Link>
                    <Link href="/api/auth/signin" data-active={isActive('/signup')}>Log in
                    </Link>
                </div>
            </div>
        );
    }

    if (session.value) {
        left = (
            <div class={styles.left}>
                <Link href="/public" class={[styles.title, styles.bold]} data-active={isActive('/')}>
                        Rosenhof <br/> Randomizer

                </Link>
            </div>
        );
        right = (
            <div class={styles.right}>
                <p>
                    {session.value.user?.name} {session.value.user?.email}
                </p>
                <button onClick$={()=>signOut.submit({ callbackUrl: '/' })}>Log out</button>
            </div>
        );
    }

    return (
        <nav class={"flex items-center justify-start sticky top-0 z-40 bg-white p-8"}>
            {left}
            {right}
        </nav>
    )

})
