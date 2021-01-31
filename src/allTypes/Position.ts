import {objectType} from "@nexus/schema";
import {differenceInYears, differenceInMonths} from "date-fns";

export const Position = objectType({
    name: "Position",
    definition(t) {
        t.id("id");
        t.string("title");
        t.string("company");
        t.string("location");
        t.string("employmentType");
        t.date("startDate",  { 
            description: "Start date of this position",
            resolve: (position) => new Date(position.startDate) 
        });
        t.date("endDate",  { 
            description: "End date of this position",
            resolve: (position) => position.endDate ? new Date(position.endDate) : null, 
        });
        t.int("years", {
            resolve: (position) => {
                const {startDate, endDate} = position;
                return (
                    differenceInYears(
                        endDate ? new Date(endDate) : new Date(), 
                        new Date(startDate)
                    )
                )
            }
        })
        t.int("months", {
            resolve: (position) => {
                const {startDate, endDate} = position;
                return (
                    differenceInMonths(
                        endDate ? new Date(endDate) : new Date(), 
                        new Date(startDate)
                    ) % 12
                )
            }
        }); 
        t.list.string("achievements", {
            resolve: (position) => position.achievements
        })
    }
})