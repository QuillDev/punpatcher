import {PunishmentAction, PunishmentCategory, Rank} from "./src/models/Punishments";
import fetch from 'cross-fetch';

const API_URL = "http://localhost:3000";

const getCategories = async (): Promise<PunishmentCategory[]> => {
    const categories: PunishmentCategory[] = [];

    const data = await fetch(API_URL + "/v1/punishment-category").then((res) => res.json())

    console.log(data);

    return categories;
}

const modifyCategory = async (category: PunishmentCategory) => {
    await fetch(API_URL + "/v1/punishment-category/" + category.name, {
        method: "PATCH",
        body: JSON.stringify(category),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });

    console.log(`Attempted to patch ${category.short}`)
}

( async () => {
    const category: PunishmentCategory = {
        short: "test",
        name: "test_thing",
        deprecated: false,
        message: "some message",
        level: 1,
        scale: PunishmentAction.MUTE,
        ordinal: 12,
        requiredRank: Rank.SR_MOD,
        displayMaterial: "FEATHER"
    };
    await modifyCategory(category)
    await getCategories();
})();
