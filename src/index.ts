import RAW_ACTION_DUMP from "./actiondump.json";
import { ActionDump } from "./parseActionDump";
const actions = new ActionDump(RAW_ACTION_DUMP as ActionDumpJSON);

type Method =
  | {
      [key: string]: Method;
    }
  | ((req: Request, url: URL) => Response);

const jsonResponse = (json: { [key: string]: any }) => {
  return new Response(JSON.stringify(json), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

const methods: {
  [key: string]: Method;
} = {
  "/": () => {
    return jsonResponse(actions.getJson());
  },
  codeblocks: {
    "/": () => {
      return jsonResponse(actions.getJson().codeblocks);
    },
    search: (req, url) => {
      const results = ActionDump.search(
        actions.getJson().codeblocks,
        (block) => [block.name, ...block.item.description],
        url.searchParams.get("q")?.toString()
      );
      return jsonResponse(results);
    },
  },
  events: {
    "/": () => {
      return jsonResponse(actions.getEvents());
    },
    search: (req, url) => {
      let results = actions.getEvents();
      const query = url.searchParams.get("q");
      if (query)
        results = ActionDump.search(
          results,
          (event) => [
            event.name,
            ...event.aliases,
            event.icon.name,
            ...event.icon.description,
            event.icon.requiredRank,
          ],
          query.toString()
        );
      const requiredRank = url.searchParams.get("requiredrank");
      if (requiredRank)
        results = ActionDump.search(
          results,
          (event) => [event.icon.requiredRank],
          requiredRank.toString()
        );
      return jsonResponse(results);
    },
  },
  actions: {
    "/": () => {
      return jsonResponse(actions.getActions());
    },
    search: (req, url) => {
      let results = actions.getActions();
      const query = url.searchParams.get("q");
      if (query)
        results = ActionDump.search(
          results,
          (action) => [
            action.name,
            action.icon.name,
            ...action.aliases,
            ...action.icon.description,
            action.icon.requiredRank,
            ...action.icon.worksWith,
          ],
          query.toString()
        );
      const requiredRank = url.searchParams.get("requiredrank");
      if (requiredRank)
        results = ActionDump.search(
          results,
          (action) => [action.icon.requiredRank],
          requiredRank.toString()
        );
      const worksWith = url.searchParams.get("workswith");
      if (worksWith)
        results = ActionDump.search(
          results,
          (action) => action.icon.worksWith,
          worksWith.toString()
        );
      return jsonResponse(results);
    },
  },
};

function findMethod(path: string): Method | undefined {
  let parts = path.split("/").filter((p) => p); // Remove empty strings from path
  let method: Method | undefined = methods;

  for (const part of parts) {
    if (typeof method !== "function" && part in method) {
      method = method[part];
    } else {
      return undefined; // No method found for the path
    }
  }

  // Check if the final part of the method is a function or if there's a "/" method
  if (typeof method === "function") {
    return method;
  } else if (typeof method === "object" && "/" in method) {
    return method["/"];
  }

  return undefined; // No method found
}

const server = Bun.serve({
  port: 3000,
  fetch(request: Request) {
    const url = new URL(request.url);
    const path = url.pathname;

    const method = findMethod(path);
    if (typeof method === "function") {
      return method(request, url);
    }

    return new Response("Endpoint not found", { status: 404 });
  },
});

console.log(`Listening on localhost:${server.port}`);
