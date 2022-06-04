import {PunishmentAction, PunishmentCategory, PunishmentCategoryPatch, Rank} from "./src/models/Punishments";
import fetch from 'cross-fetch';

const API_URL = "http://localhost:3000";

const getCategories = async (): Promise<PunishmentCategory[]> => {
    const categories: PunishmentCategory[] = [];

    const data = await fetch(API_URL + "/v1/punishment-category").then((res) => res.json())

    console.log(data);
    return categories;
}

const modifyCategory = async (category: PunishmentCategoryPatch) => {
    await fetch(API_URL + "/v1/punishment-category/" + category.name, {
        method: "PATCH",
        body: JSON.stringify(category),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });

    console.log(`Attempted to patch ${category.short}`)
}

const deleteCategory = async (identifier: string) => {
    await fetch(API_URL+"/v1/punishment-category/" + identifier, {
        method: "DELETE"
    })

    console.log(`Attempting to delete ${identifier}`)
}

( async () => {
    await modifyCategory({short: "test", deprecated: false})
    await getCategories();

    console.log("operations complete.")
})();
