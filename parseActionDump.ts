export class ActionDump {
  private actionDump: { [key: string]: any };
  public constructor(actionDumpInput: string | { [key: string]: any }) {
    this.actionDump =
      typeof actionDumpInput === "string"
        ? JSON.parse(actionDumpInput)
        : actionDumpInput;
  }

  public getJson() {
    return this.removePatternFromJson(this.actionDump);
  }

  public getEvents() {
    return this.getJson().actions.filter((action: any) => {
      return (
        action.codeblockName === "PLAYER EVENT" ||
        action.codeblockName === "ENTITY EVENT"
      );
    });
  }

  public getActions() {
    return this.getJson().actions.filter((action: any) => {
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
    query = query.toLowerCase();
    return array.filter((item: any) => {
      return searchIndex(item).some((searchIn) => {
        return searchIn.toLowerCase().includes(query);
      });
    });
  }

  private removePatternFromJson(jsonObj: { [key: string]: any }) {
    // Recursive function to process each item
    function processItem(item: any): any {
      // Check the type of the item
      if (typeof item === "string") {
        // Replace the pattern in the string
        return item.replace(/§./g, "");
      } else if (Array.isArray(item)) {
        // Process each element in the array
        return item.map((element) => processItem(element));
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
    return processItem(jsonObj);
  }
}
