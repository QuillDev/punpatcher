import {patchToCategory, PunishmentCategory, PunishmentCategoryPatch} from "./src/models/Punishments";
import fetch from 'cross-fetch';
import {readFileSync} from "fs";
import * as console from "console";

const API_URL = "http://localhost:3000";

const loadFromFile = (): PunishmentCategoryPatch[] => {
    const puns: PunishmentCategoryPatch[] = JSON.parse(readFileSync('patch.json', 'utf-8'));
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

const deleteCategory = async (identifier: string) => {
    await fetch(API_URL+"/v1/punishment-category/" + identifier, {
        method: "DELETE"
    }).catch(console.error)

    console.log(`Attempting to delete ${identifier}`)
}

( async () => {
    const name= (await getCategories()).map((it) => it.name);
    console.log(name);
    // // load the patches from the file
    // const patches: PunishmentCategoryPatch[] = loadFromFile();
    //
    // // try to load all patches from the file
    // for(const patch of patches){
    //     // if we have not created this punishment, create it
    //     if(!names.includes(patch.short)){
    //         await createCategory(patchToCategory(patch)).then(console.info);
    //         continue;
    //     }
    //
    //     await modifyCategory(patch).then(console.info)
    // }
})();
