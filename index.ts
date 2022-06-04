import {PunishmentAction, PunishmentCategory, PunishmentCategoryPatch} from "./src/models/Punishments";
import fetch from 'cross-fetch';

const API_URL = "http://localhost:3000";

const getCategories = async (): Promise<PunishmentCategory[]> => {
    const categories: PunishmentCategory[] = [];

    const data = await fetch(API_URL + "/v1/punishment-category").then((res) => res.json())
        .catch(console.error)

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
    }).catch(console.error)

    console.log(`Attempted to patch ${category.short}`)
}

const deleteCategory = async (identifier: string) => {
    await fetch(API_URL+"/v1/punishment-category/" + identifier, {
        method: "DELETE"
    }).catch(console.error)

    console.log(`Attempting to delete ${identifier}`)
}

( async () => {

    const patches: PunishmentCategoryPatch[] = [
        //discrimination update
        {
            short: "Discrimination",
            name: "Racial Slurs",
            message: "Using slurs and/or discriminating others is not allowed.",
            level: 8,
            scale: PunishmentAction.BAN
        },
        // harassment update
        {
            short: "Harassment",
            name: "Harassment",
            message: "Harassing other players and staff is not permitted.",
            level: 8,
            scale: PunishmentAction.BAN
        },
        //self harm update
        {
            short: "Encouraging_Harm",
            name: "Suicide/Harm Encouragement or Death Wishes",
            message: "Death wishes or encouraging self harm to others is not permitted.",
            level: 11,
            scale: PunishmentAction.BAN
        }
    ]

    for (const patch of patches) {
        await modifyCategory(patch);
    }

    await getCategories();

    console.log("operations complete.")
})();
