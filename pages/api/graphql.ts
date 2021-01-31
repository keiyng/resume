import {ApolloServer} from 'apollo-server-micro';
import {schema} from "src/schema";

const server = new ApolloServer({schema});
const handler = server.createHandler({path: "/api/graphql"});

// add this to avoid query getting stuck at loading state forever
export const config = {
    api: {
        bodyParser: false
    }
}

export default handler;