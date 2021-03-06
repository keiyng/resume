import {decorateType} from "@nexus/schema";
// define basic scalars that don't come with graphql by default
import {GraphQLDate, GraphQLURL} from 'graphql-scalars'; 

export const GQLDate = decorateType(GraphQLDate, {
    rootTyping: "Date",
    asNexusMethod: 'date',
})

export const GQLURL = decorateType(GraphQLURL, {
    rootTyping: "URL",
    asNexusMethod: 'url',
})

export * from "./Query";
export * from "./Bio"
export * from "./Position"
export * from "./Education"
export * from "./Skill"