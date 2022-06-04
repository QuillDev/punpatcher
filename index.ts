import {PunishmentCategory} from "./src/models/Punishments";
import fetch from 'cross-fetch';

const API_URL = "http://localhost:3000";

const getCategories = async (): Promise<PunishmentCategory[]> => {
    const categories: PunishmentCategory[] = [];

    const data = await fetch(API_URL + "/v1/punishment-category").then((res) => res.json())

    console.log(data);

    return categories;
}

( async () => {
    await getCategories();
})();
