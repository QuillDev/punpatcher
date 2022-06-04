import got from 'got';
import {PunishmentCategory} from "./src/models/Punishments";

const API_URL = "localhost:3000";

( async () => {
    await getCategories();
})();
const getCategories = async (): Promise<PunishmentCategory[]> => {
    const categories = [];

    const data = await got.get(API_URL + "/v1/punishment-category").json();

    console.log(data);

    return categories;
}