import {itemStore} from '../services/item-store';
import {Response} from "express";

export class itemController {
    main = async(req:any, res:Response): Promise<void> => {
        const userSettings = req.session.userSettings;
        const data = await itemStore.all(userSettings);
        res.render("index", {data: data, userSettings: userSettings});
    };

    index = async (req:any, res:Response): Promise<void> => {
        res.redirect("/");
    };

    itemCreation = async (req:any, res:Response): Promise<void> => {
        res.render("item", { userSettings: req.session.userSettings });
    };

    createItem = async (req:any, res:Response): Promise<void> => {
        let isdone = false;

        if (req.body.itemstate) {
            isdone = true;
        }

        if(req.path == "/createandoverview") {
            await itemStore.add(
                req.body.name,
                req.body.importance,
                req.body.duedate,
                req.body.description,
                isdone);

            res.redirect("/");
        } else {
            const item = await itemStore.add(
                req.body.name,
                req.body.importance,
                req.body.duedate,
                req.body.description,
                isdone);

            res.render("item", { item: item, userSettings: req.session.userSettings });
        }
    };

    updateItem = async (req:any, res:Response): Promise<void> => {
        const isdone = req.body.itemstate ? true: false;
        const item = await itemStore.update(
            req.body.id,
            req.body.name,
            req.body.importance,
            req.body.duedate,
            req.body.description,
            isdone);

        if(req.path == "/updateandoverview") {
            res.redirect("/");
        } else {
            res.render("item", { item: item, userSettings: req.session.userSettings });
        }
    };

    showItem = async (req:any, res:Response): Promise<void> => {
        const item = await itemStore.get(req.params.id);
        res.render("item", { item: item, userSettings: req.session.userSettings });
    };
}

export const itemsController = new itemController();
