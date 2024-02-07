import {$, component$, useSignal} from "@builder.io/qwik";


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
            <h2>{props.name}</h2>
            <div class={"roll-box"}>
                <h2 class={"roll-box-content"}>{rolledMeal.value?.name} {rolledMeal.value?.description}</h2>
            </div>
            <div class={"flex"}>
                <button class={"roll-button"} onClick$={rollMeal}>{props.name} würfeln</button>
                <p class={"reset"} onClick$={() => selectedMeals.value = []}>Auswahl zurücksetzen</p>
            </div>
            {rollIsFinished && <div><p>Preis: €</p></div>}
            {props.categories.map((category) => (
                <div key={category.id}>
                    <h3>{category.name}</h3>
                    {props.meals.filter(meal => meal.categoryId === category.id).map((meal) => (
                        <div key={meal.id}>
                            <p
                                class={selectedMeals.value.indexOf(meal.id) === -1 ? "pointer" : "pointer bg"}
                                onClick$={() => selectMeal(meal.id)}
                            >{meal.name} {meal.description}</p>
                        </div>
                    ))}
                </div>
            ))}
            <style jsx>{`
                .bg {
                    background-color: rgb(149, 138, 104);
                }

                .pointer {
                    cursor: pointer;
                }

                .roll-box {
                    height: 16rem;
                    width: 100%;
                    align-items: center;
                    background-color: rgb(241, 237, 225);

                }

                .roll-box-content {
                    height: 100%;
                    margin: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: start;
                }

                .roll-button {
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                    font-size: 1rem;
                }

                .flex {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .reset {
                    font-size: 0.8rem;
                    color: rgb(149, 138, 104);
                    cursor: pointer;
                }
            `}</style>
        </div>
    )


})
