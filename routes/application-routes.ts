import express from 'express';

const router = express.Router();
import {itemsController} from '../controller/item-controller';

router.get("/", itemsController.main);
router.post("/", itemsController.index);
router.get("/item", itemsController.itemCreation);
router.post("/item", itemsController.createItem)
router.post("/updateandoverview", itemsController.updateItem);
router.post("/createandoverview", itemsController.createItem);
router.get("/item/:id/", itemsController.showItem);
router.post("/item/:id/", itemsController.updateItem);

export const applicationRoutes = router;
