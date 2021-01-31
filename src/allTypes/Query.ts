import {queryType, idArg} from "@nexus/schema";
import {data} from 'src/data';
import {Bio, Position, Education, Skill} from './index';

export const Query = queryType({
    definition(t) {
        t.field("bio", {
            type: Bio,
            description: "Get bio",
            resolve: () => data.bio
        });

        t.list.field("positions", {
            type: Position,
            description: "Get all positions",
            resolve: () => data.positions
        });

        t.field("position", {
            type: Position,
            description: "Find a position by its ID",
            args: {id: idArg()},
            resolve: (root, {id}: {id: string}, ctx) => data.positions.find(position => position.id === id)
        });

        t.list.field("education", {
            type: Education,
            description: "Get all education",
            resolve: () => data.education
        })

        t.field("skills", {
            type: Skill,
            description: "Get all skills",
            resolve: () => data.skills
        })
    }
})