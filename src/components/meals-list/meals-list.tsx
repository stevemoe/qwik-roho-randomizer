import {$, component$, useSignal} from "@builder.io/qwik";
import styles from "./meals-list.module.css";


interface MealProps {
    id: string;
    key: string;
    name: string;
    description: string | null;
    order: number;
    categoryId: string | null;
}

interface Category {
    id: string;
    key: string;
    name: string;
    order: number;
}

interface Props {
    meals: MealProps[]
    categories: Category[]
    name: string
}

export default component$<Props>((props) => {

    const mealsList = useSignal<MealProps[]>(props.meals);
    const selectedMeals = useSignal<string[]>([]);
    const rolledMeal = useSignal<MealProps>();
    const speed = useSignal(100);
    const rollIsFinished = useSignal<boolean>(false);

    const selectMeal = $((mealId: string) => {
        const newSelectedMeals: string[] = [...selectedMeals.value];
        if (selectedMeals.value.indexOf(mealId) === -1) {
            newSelectedMeals.push(mealId);
        } else {
            const index = newSelectedMeals.indexOf(mealId);
            if (index > -1) {
                newSelectedMeals.splice(index, 1);
            }
        }
        selectedMeals.value = newSelectedMeals;
    })

    const searchMeal = $((mealId: string) => {
        // const meal: MealProps | undefined = mealsList.value.find(meal => meal.id === mealId);
        return mealsList.value.find(meal => meal.id === mealId);
    })

    const rollMeal = $(async () => {
        // console.log('rollMeal')
        rollIsFinished.value = false;
        let ctr = 0;
        const timer = setInterval(async () => {
            rolledMeal.value = await searchMeal(selectedMeals.value[ctr]);
            ctr === selectedMeals.value.length - 1 ? ctr = 0 : ctr++;
        }, speed.value)
        setTimeout(async () => {
            clearInterval(timer);
            const randomMealNumber = Math.floor(Math.random() * selectedMeals.value.length);
            rolledMeal.value = await (searchMeal(selectedMeals.value[randomMealNumber]));
            rollIsFinished.value = true;
        }, 3000)
    })


    return (
        <div>
            <div class={"sticky top-24 bg-white"}>
            <h2 class={"font-bold text-2xl "}>{props.name}</h2>
            <div class={styles.rollBox}>
                <h2 class={[styles.rollBoxContent, "font-bold"]}>{rolledMeal.value?.name} {rolledMeal.value?.description}</h2>
            </div>
            <div class={styles.flex}>
                <button class={[ "bg-neutral-500/30 my-6 px-4 py-2 text-base"]} onClick$={rollMeal}>{props.name} würfeln</button>
                <p class={styles.reset} onClick$={() => selectedMeals.value = []}>Auswahl zurücksetzen</p>
            </div>
            {rollIsFinished.value && <div><p>Preis: €</p></div>}
            </div>
            {props.categories.map((category) => (
                <div key={category.id}>
                    <h3 class={"font-bold"}>{category.name}</h3>
                    {props.meals.filter(meal => meal.categoryId === category.id).map((meal) => (
                        <div key={meal.id}>
                            <p
                                class={["m-4",selectedMeals.value.indexOf(meal.id) === -1 ? styles.pointer : [styles.pointer, styles.bg]]}
                                onClick$={() => selectMeal(meal.id)}
                            >{meal.name} {meal.description}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )


})
