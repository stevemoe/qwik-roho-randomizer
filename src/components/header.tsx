import {component$} from "@builder.io/qwik";
import {Link, useLocation} from "@builder.io/qwik-city";
import {useAuthSession, useAuthSignout} from "~/routes/plugin@auth";

export default component$(() => {
    const loc = useLocation();
    const isActive: (pathname: string) => boolean = (pathname) => loc.url.pathname === pathname;

    const session = useAuthSession();

    const signOut = useAuthSignout();

    let left = (
        <div class="left">
            <Link href="/" class="bold" data-active={isActive('/')}>
                    Rosenhof <br/> Randomizer

            </Link>
            <style jsx>{`
                .bold {
                    font-weight: bold;
                }

                a {
                    text-decoration: none;
                    display: inline-block;
                }

                .left a[data-active='true'] {
                    color: gray;
                }

                a + a {
                    margin-left: 1rem;
                }
            `}</style>
        </div>
    );

    let right = null;


    if (!session.value) {
        right = (
            <div class="right">
                <div class={"flex"}>
                    <Link href="/create" data-active={isActive('/signup')}>Sign up
                    </Link>
                    <Link href="/api/auth/signin" data-active={isActive('/signup')}>Log in
                    </Link>
                </div>
                <style jsx>{`
                    a {
                        text-decoration: none;
                        display: inline-block;
                        font-size: 0.8rem
                    }

                    a + a {
                        margin-left: 1rem;
                    }

                    .right {
                        margin-left: auto;
                    }

                    .right a {
                        border: 1px solid;
                        padding: 0.5rem 1rem;
                        border-radius: 3px;
                    }

                    .flex {
                        display: flex;
                    }
                `}</style>
            </div>
        );
    }

    if (session.value) {
        left = (
            <div class="left">
                <Link href="/" class="bold" data-active={isActive('/')}>
                        Rosenhof <br/> Randomizer

                </Link>
                <style jsx>{`
                    .bold {
                        font-weight: bold;
                    }

                    a {
                        text-decoration: none;
                        display: inline-block;
                    }

                    .left a[data-active='true'] {
                        color: gray;
                    }

                    a + a {
                        margin-left: 1rem;
                    }
                `}</style>
            </div>
        );
        right = (
            <div class="right">
                <p>
                    {session.value.user?.name} {session.value.user?.email}
                </p>
                <button onClick$={()=>signOut.submit({ callbackUrl: '/' })}>Log out</button>
                <style jsx>{`
                    a {
                        text-decoration: none;
                        display: inline-block;
                    }

                    p {
                        display: inline-block;
                        font-size: 13px;
                        padding-right: 1rem;
                    }

                    a + a {
                        margin-left: 1rem;
                    }

                    .right {
                        margin-left: auto;
                    }

                    .right a {
                        border: 1px solid;
                        padding: 0.5rem 1rem;
                        border-radius: 3px;
                    }

                    button {
                        border: none;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <nav>
            {left}
            {right}
            <style jsx>{`
                nav {
                    display: flex;
                    padding: 2rem;
                    align-items: center;
                    justify-content: space-between;
                }
            `}</style>
        </nav>
    )

})
