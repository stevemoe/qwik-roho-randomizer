import {component$} from "@builder.io/qwik";
import {DocumentHead, routeLoader$} from "@builder.io/qwik-city";
import {PrismaClient} from "@prisma/client";
import MealsList from "~/components/meals-list";

const prisma = new PrismaClient();
export const useGetMeals = routeLoader$(async () => {
    const meals = await prisma.item.findMany();
    return meals;
})

export const useGetCategories = routeLoader$(async () => {
    const categories = await prisma.category.findMany();
    // console.log(categories)
    return categories;
})


export default component$(() => {
    const meals = useGetMeals();
    const categories = useGetCategories();

    const starterCourse = ["SOUP", "STARTER"]
    const mainCourse = ["SALAD", "PAN", "PANSPECIAL", "GRILL", "LAMBSHANK", "GRATINATED", "FISH", "VEGI", "SMALL"];
    const dessertCourse = ["DESSERT"]

    const starterCategories = categories.value.filter(category => starterCourse.includes(category.key)).sort((a, b) => a.order - b.order);
    const mainCategories = categories.value.filter(category => mainCourse.includes(category.key)).sort((a, b) => a.order - b.order);
    const dessertCategories = categories.value.filter(category => dessertCourse.includes(category.key)).sort((a, b) => a.order - b.order);

    return (
        <>
            <h1>Hi 👋</h1>
            <p>
                Can't wait to see what you build with qwik!
                <br/>
                Happy coding.
            </p>
            <MealsList meals={meals.value} categories={starterCategories} name={"Vorspeise"}/>
            <MealsList meals={meals.value} categories={mainCategories} name={"Hauptgericht"}/>
            <MealsList meals={meals.value} categories={dessertCategories} name={"Dessert"}/>
        </>
    );
});

export const head: DocumentHead = {
    title: "Welcome to Qwik",
    meta: [
        {
            name: "description",
            content: "Qwik site description",
        },
    ],
};
