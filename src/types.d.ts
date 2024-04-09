type Rank = "" | "Noble" | "Emperor" | "Mythic" | "Overlord";
type CodeBlockName =
  | "PLAYER EVENT"
  | "ENTITY EVENT"
  | "FUNCTION"
  | "PROCESS"
  | "PLAYER ACTION"
  | "GAME ACTION"
  | "ENTITY ACTION"
  | "IF PLAYER"
  | "IF VARIABLE"
  | "IF GAME"
  | "IF ENTITY"
  | "ELSE"
  | "REPEAT"
  | "SET VARIABLE"
  | "CONTROL"
  | "CALL FUNCTION"
  | "START PROCESS"
  | "SELECT OBJECT";
interface Color {
  red: number;
  green: number;
  blue: number;
}

interface BaseItem {
  material: string;
  name: string;
  deprecatedNote: string[];
  description: string[];
  example: string[];
  worksWith: string[];
  additionalInfo: string[];
  requiredRank: Rank;
  requireTokens: boolean;
  requireRankAndTokens: boolean;
  advanced: boolean;
  loadedItem: string;
}
type Item =
  | BaseItem
  | (BaseItem & {
      material: "PLAYER_HEAD";
      head: string;
    })
  | (BaseItem & {
      material:
        | "POTION"
        | "SPLASH_POTION"
        | "LINGERING_POTION"
        | "TIPPED_ARROW";
      color?: Color;
    });

interface CodeBlock {
  name: CodeBlockName;
  identifier: string;
  item: Item;
}

interface EventsOrActions {
  name: string;
  codeblockName: CodeBlockName;
  tags: string[];
  aliases: string[];
  icon: Item & {
    cancellable: boolean;
    cancelledAutomatically: boolean;
  };
}

interface GameValueCategory {
  identifier: string;
  guiSlot: number;
  icon: Item;
}
interface GameValue {
  aliases: string[];
  category: string;
  icon: Item & {
    returnType: string;
    returnDescription: string[];
  };
}

interface Particle {
  particle: string;
  icon: Item;
  category: string;
  fields: string[];
}

interface SoundCategory {
  identifier: string;
  icon: Item;
  hasSubCategories: boolean;
}
interface Sound {
  sound: string;
  icon: Item;
}

interface Potion {
  potion: string;
  icon: Item & {
    color: Color;
  };
}

interface Cosmetic {
  id: string;
  icon: Item;
  name: string;
  slot: number;
  category: {};
}

interface ShopPurchasable {
  item: Item;
  id: string | null;
  price: number;
  currencyType: "Token" | "Prize Ticket";
}
interface Shop {
  id: string;
  slot: number;
  name: string;
  icon: Item;
  purchasables: ShopPurchasable[];
}

interface ActionDumpJSON {
  codeblocks: CodeBlock[];
  actions: EventsOrActions[];
  gameValueCategories: GameValueCategory[];
  gameValues: GameValue[];
  particleCategories: Particle[];
  particles: Particle[];
  soundCategories: SoundCategory[];
  sounds: Sound[];
  potions: Potion[];
  cosmetics: Cosmetic[];
  shops: Shop[];
}
