"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serverless = require("serverless-http");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const bridges_module_1 = require("./bridges.module");
const app = express();
async function bootstrap() {
    const nestApp = await core_1.NestFactory.create(bridges_module_1.BridgesModule, new platform_express_1.ExpressAdapter(app));
    await nestApp.init();
}
const isAppInitialized = (expressInstance) => {
    return !!(expressInstance._router && expressInstance._router.stack);
};
async function handler(req, res) {
    if (!isAppInitialized(app)) {
        await bootstrap();
    }
    app(req, res);
}
exports.main = serverless(handler);
//# sourceMappingURL=handler.js.map