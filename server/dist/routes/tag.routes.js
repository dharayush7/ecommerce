"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tag_controller_1 = require("@/controllers/tag.controller");
const router = (0, express_1.Router)();
router.get("/get", tag_controller_1.getTagHandler);
exports.default = router;
