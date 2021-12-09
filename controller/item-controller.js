"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemsController = exports.itemController = void 0;
const item_store_1 = require("../services/item-store");
class itemController {
    constructor() {
        this.main = async (req, res) => {
            const userSettings = req.session.userSettings;
            const data = await item_store_1.itemStore.all(userSettings);
            res.render("index", { data: data, userSettings: userSettings });
        };
        this.index = async (req, res) => {
            res.redirect("/");
        };
        this.itemCreation = async (req, res) => {
            res.render("item", { userSettings: req.session.userSettings });
        };
        this.createItem = async (req, res) => {
            let isdone = false;
            if (req.body.itemstate) {
                isdone = true;
            }
            if (req.path == "/createandoverview") {
                await item_store_1.itemStore.add(req.body.name, req.body.importance, req.body.duedate, req.body.description, isdone);
                res.redirect("/");
            }
            else {
                const item = await item_store_1.itemStore.add(req.body.name, req.body.importance, req.body.duedate, req.body.description, isdone);
                res.render("item", { item: item, userSettings: req.session.userSettings });
            }
        };
        this.updateItem = async (req, res) => {
            const isdone = req.body.itemstate ? true : false;
            const item = await item_store_1.itemStore.update(req.body.id, req.body.name, req.body.importance, req.body.duedate, req.body.description, isdone);
            if (req.path == "/updateandoverview") {
                res.redirect("/");
            }
            else {
                res.render("item", { item: item, userSettings: req.session.userSettings });
            }
        };
        this.showItem = async (req, res) => {
            const item = await item_store_1.itemStore.get(req.params.id);
            res.render("item", { item: item, userSettings: req.session.userSettings });
        };
    }
}
exports.itemController = itemController;
exports.itemsController = new itemController();
//# sourceMappingURL=item-controller.js.map