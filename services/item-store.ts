import Datastore from 'nedb-promises'
import {Settings} from "../utils/session-middleware";

export class Item {
  public name: string;
  public importance : number;
  public duedate: Date;
  public creationdate: number;
  public description: string;
  public isdone: boolean;

  constructor(nm: string, imp: number, duedate: Date, creationdate: number, description: string, isdone: boolean) {
    this.name = nm;
    this.importance = imp;
    this.duedate = duedate;
    this.creationdate = creationdate;
    this.description = description;
    this.isdone = isdone;
  }
}

export class ItemStore {
  public db : Datastore;
  constructor( db?: Datastore) {
    const options = process.env.DB_TYPE === "FILE" ? {filename: './data/items.db', autoload: true} : {}
    this.db = db || new Datastore(options);
  }

  async add(itemName: string, importance: number, duedate: Date, description: string, isdone: boolean): Promise<Item> {
    const creationdate = Date.now();
    const order = new Item(
        itemName,
        importance,
        duedate,
        creationdate,
        description,
        isdone);

    return this.db.insert(order);
  }

  async update(id: string, itemName: string, importance: number, duedate: Date, description: string, isdone: boolean): Promise<Document> {
    const olditem: Item = await this.db.findOne({_id: id});

    await this.db?.update({_id: id}, {$set: {"name": itemName,
        "importance": importance,
        "duedate": duedate,
        "creationdate": olditem.creationdate,
        "description": description,
        "isdone": isdone }});

    return this.get(id);
  }

  async get(id: string): Promise<Document> {
    return this.db.findOne({_id: id});
  }

  async all(userSettings: Settings) {
    let searchQuery = {};
    const sortQuery = { [userSettings.orderBy]: userSettings.orderDirection };
    if (userSettings.filterCompleted) {
      searchQuery = { isdone: false };
    }

    return this.db.find(searchQuery).sort(sortQuery);
  }
}

export const itemStore = new ItemStore();
