import { container } from "tsyringe";

import { IDateProvider } from "./dayjsprovider/IDateProvider";
import { DayjsDateProvider } from "./dayjsprovider/implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
);
