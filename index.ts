import {patchToCategory, PunishmentAction, PunishmentCategory, PunishmentCategoryPatch} from "./src/models/Punishments";
import fetch from 'cross-fetch';
import {readFileSync} from "fs";
import * as console from "console";

const API_URL = "http://localhost:3000";

const loadFromFile = (fileName: string): PunishmentCategoryPatch[] => {
    const puns: PunishmentCategoryPatch[] = JSON.parse(readFileSync(fileName, 'utf-8'));
    return puns;
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
    await fetch(API_URL+"/v1/punishment-category/deprecate/" + identifier, {
        method: "DELETE"
    }).catch(console.error)

    console.log(`Attempting to delete ${identifier}`)
}

const deleteCategory = async (identifier: string) => {
    await fetch(API_URL+"/v1/punishment-category/" + identifier, {
        method: "DELETE"
    }).catch(console.error)

    console.log(`Attempting to delete ${identifier}`)
}

const wipePunishments = async () => {
    const cats = await getCategories();

    for(const cat of cats){
        // @ts-ignore
        await deleteCategory(cat["_id"] as string);
    }
}

( async () => {
    const cats = (await getCategories());
    const names = cats.map((it) => it.short);

    // load the patches from the file
    const patches: PunishmentCategoryPatch[] = loadFromFile('patch4.json');


    const promises: Promise<void>[] = [];
    // try to load all patches from the file
    for(const patch of patches){
        console.info(`Attempting to patch ${patch.short}`);
        const promise = modifyCategory(patchToCategory(patch));
        promise.then(console.info)
        promise.catch(console.error);
        promises.push(promise);
    }

    await Promise.all(promises);
})();
