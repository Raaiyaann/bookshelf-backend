import {
  addBooksHandler,
  getAllBooksHandler,
  getBooksByIdHandler,
  updateBookByIdHandler,
} from "./handler.js";
const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBooksHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBooksByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: updateBookByIdHandler,
  },
];

export default routes;
