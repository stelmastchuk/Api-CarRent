import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationController } from "@modules/cars/useCases/listSpecification/ListSpecificationController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationController.handle
);

specificationRoutes.get(
    "/",
    ensureAuthenticated,
    listSpecificationController.handle
);

export { specificationRoutes };
