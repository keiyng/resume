import {objectType} from "@nexus/schema";

export const Skill = objectType({
    name: "Skill",
    definition(t) {
        t.list.string("frontEnd")
        t.list.string("backEnd")
        t.list.string("database")
        t.list.string("others")
    }
})