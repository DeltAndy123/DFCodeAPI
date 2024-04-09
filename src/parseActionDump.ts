export class ActionDump {
  private actionDump: ActionDumpJSON;
  public constructor(actionDumpInput: string | ActionDumpJSON) {
    this.actionDump =
      typeof actionDumpInput === "string"
        ? JSON.parse(actionDumpInput)
        : actionDumpInput;
  }

  public getJson() {
    // Recursive function to process each item
    function processItem<I>(item: I): I {
      // Check the type of the item
      if (typeof item === "string") {
        // Replace the pattern in the string
        return item.replace(/§./g, "") as unknown as I;
      } else if (Array.isArray(item)) {
        // Process each element in the array
        return item.map((element) => processItem(element)) as unknown as I;
      } else if (typeof item === "object" && item !== null) {
        // Process each property in the object
        for (let key in item) {
          item[key] = processItem(item[key]);
        }
        return item;
      }
      // Return the item if it's not string, array, or object
      return item;
    }

    // Start processing from the root
    return processItem(this.actionDump);
  }

  public getEvents() {
    return this.getJson().actions.filter((action: EventsOrActions) => {
      return (
        action.codeblockName === "PLAYER EVENT" ||
        action.codeblockName === "ENTITY EVENT"
      );
    });
  }

  public getActions() {
    return this.getJson().actions.filter((action: EventsOrActions) => {
      return !["PLAYER EVENT", "ENTITY EVENT", "FUNCTION", "PROCESS"].includes(
        action.codeblockName
      );
    });
  }

  static search<A>(
    array: A[],
    searchIndex: (item: A) => string[],
    query?: string
  ) {
    if (!query) return array;
    // Break the query into words and lower case them
    const queryWords = query.toLowerCase().split(/\s+/);

    return array.filter((item: any) => {
      // For each item, get the strings to search in and normalize them
      const searchStrings = searchIndex(item).map((s) => s.toLowerCase());

      // Check if all query words are in any of the search strings
      return searchStrings.some((searchString) =>
        queryWords.every((queryWord) => searchString.includes(queryWord))
      );
    });
  }
}
