import { activityPageState} from "@/atoms";
import { fetchActivities } from "@/lib/http/activities";
import { selector} from "recoil";

export const activitiesQuery = selector({
    key: "activitiesQuery",
    get: async ({ get }) => {
        const { page, size } = get(activityPageState);
        const response = await fetchActivities(page, size);
        if (response.error) {
            throw response.error;
        }
        console.log(response);
        return response;
    },
});