"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_koa = __toESM(require("koa"));
var import_koa_router = __toESM(require("koa-router"));
var import_koa_bodyparser = __toESM(require("koa-bodyparser"));
var import_koa_logger = __toESM(require("koa-logger"));
var import_koa_json = __toESM(require("koa-json"));
const app = new import_koa.default();
const router = new import_koa_router.default({ prefix: "/api/v1/articles" });
const welcomeAPI = async (ctx, next) => {
  ctx.body = {
    message: "Welcome to the blog API!"
  };
  await next();
};
const articles = [
  { title: "hello article", fullText: "some text here to fill the body" },
  { title: "another article", fullText: "again here is some text here to fill" },
  { title: "coventry university ", fullText: "some news about coventry university" },
  { title: "smart campus", fullText: "smart campus is coming to IVE" }
];
const getAll = async (ctx, next) => {
  ctx.body = articles;
  await next();
};
const getById = async (ctx, next) => {
  let id = ctx.params.id;
  if (id < articles.length + 1 && id > 0) {
    ctx.body = articles[id - 1];
  } else {
    ctx.status = 404;
  }
  await next();
};
const createArticle = async (ctx, next) => {
  let { title, fullText } = ctx.request.body;
  let newArticle = { title, fullText };
  articles.push(newArticle);
  ctx.status = 201;
  ctx.body = newArticle;
  await next();
};
async function updateArticle(ctx, next) {
  try {
    const id = parseInt(ctx.params.id);
    const articleIndex = id - 1;
    if (articleIndex >= 0 && articleIndex < articles.length) {
      let { title = "", fullText = "" } = ctx.request.body;
      articles[articleIndex].title = title;
      articles[articleIndex].fullText = fullText;
      ctx.status = 200;
      ctx.body = articles[articleIndex];
    } else {
      ctx.status = 404;
      ctx.body = { error: "Article not found" };
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: "Internal server error" + err + ctx.request.body };
  }
  await next();
}
async function deleteArticle(ctx, next) {
  try {
    const id = parseInt(ctx.params.id);
    const articleIndex = id - 1;
    if (articleIndex >= 0 && articleIndex < articles.length) {
      articles.splice(articleIndex, 1);
      ctx.status = 204;
    } else {
      ctx.status = 404;
      ctx.body = { error: "Article not found" };
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: "Internal server error" };
  }
  await next();
}
app.use((0, import_koa_bodyparser.default)());
app.use((0, import_koa_logger.default)());
app.use((0, import_koa_json.default)());
app.use(router.routes());
router.get("/", getAll);
router.post("/", (0, import_koa_bodyparser.default)(), createArticle);
router.get("/:id([0-9]{1,})", getById);
router.put("/:id([0-9]{1,})", updateArticle);
router.del("/:id([0-9]{1,})", deleteArticle);
app.listen(10888);
//# sourceMappingURL=index.js.map
