import Koa from "koa";
import Router, {RouterContext} from "koa-router";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import json from "koa-json";
const app: Koa = new Koa();
const router = new Router({prefix: '/api/v1/articles'});

const welcomeAPI = async (ctx: RouterContext, next: any) => {
 ctx.body = {
 message: "Welcome to the blog API!"
 };
 await next();
}

const articles = [
 {title:'hello article', fullText:'some text here to fill the body'},
 {title:'another article', fullText:'again here is some text here to fill'},
 {title:'coventry university ', fullText:'some news about coventry university'},
 {title:'smart campus', fullText:'smart campus is coming to IVE'}
];

const getAll = async (ctx: RouterContext, next: any) => {
 // Use the response body to send the articles as JSON.
 ctx.body = articles;
 await next();
} 

const getById = async (ctx: RouterContext, next: any) => {
 // Get the ID from the route parameters.
 let id = ctx.params.id
 // If it exists then return the article as JSON.
 // Otherwise return a 404 Not Found status code
 if ((id < articles.length+1) && (id > 0)) {
 ctx.body = articles[id-1];
 } else {
 ctx.status = 404;
 }
 await next();
}

const createArticle = async (ctx: RouterContext, next: any) => {
 // The body parser gives us access to the request body on ctx.request.body.
 // Use this to extract the title and fullText we were sent.
 let {title, fullText} = ctx.request.body;
 // In turn, define a new article for addition to the array.
 let newArticle = {title:title, fullText:fullText};
 articles.push(newArticle);
 // Finally send back appropriate JSON and status code.
 // Once we move to a DB store, the newArticle sent back will now have its ID.
 ctx.status = 201;
 ctx.body = newArticle;
 await next();
}

const updateArticle = async (ctx: RouterContext, next: any) => {
 //TODO: edit an article
}
const deleteArticle = async (ctx: RouterContext, next: any) => {
 //TODO: delete an article
} 

router.get('/', getAll);
router.post('/', bodyParser(), createArticle);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', updateArticle);
router.del('/:id([0-9]{1,})', deleteArticle);
app.use(logger());
app.use(json());
app.use(router.routes());
app.listen(10888);