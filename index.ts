import {PunishmentCategory, PunishmentCategoryPatch} from "./src/models/Punishments";
import fetch from 'cross-fetch';
import * as console from "console";
import {readFile} from "fs/promises";

const API_URL = "http://localhost:3000";

const loadFromFile = async (fileName: string): Promise<PunishmentCategoryPatch[]> => {
    return JSON.parse(await readFile(fileName, 'utf-8'));
}

const getCategories = async (): Promise<PunishmentCategory[]> => {
    return await fetch(API_URL + "/v1/punishment-category").then((res) => res.json())
        .catch(console.error)
}

const modifyCategory = async (category: PunishmentCategoryPatch) => {
    const response = await fetch(API_URL + "/v1/punishment-category/" + category.short, {
        method: "PATCH",
        body: JSON.stringify(category),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then((res) => res.json())
        .catch(console.error)

    console.log(response)
}

const createCategory = async (category: PunishmentCategory) => {
    return await fetch(API_URL + "/v1/punishment-category/", {
        method: "POST",
        body: JSON.stringify(category),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then((res) => res.json()).catch(console.error);
}

const deprecateCategory = async (identifier: string) => {
    const update: PunishmentCategoryPatch = {
        short: identifier,
        deprecated: true
    }

    return await modifyCategory(update);
}

(async () => {
})();
