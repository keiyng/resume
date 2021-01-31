import {objectType} from "@nexus/schema";

export const Education = objectType({
    name: "Education",
    definition(t) {
        t.string("id");
        t.string("degree");
        t.string("school");
        t.string("description");
        t.string("endDate")
    }
})