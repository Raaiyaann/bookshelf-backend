import { nanoid } from "nanoid";
import booksShelf from "./booksShelf.js";

// menambahkan buku
const addBooksHandler = (request, h) => {
  const {
    name,
    year, // number
    author, // string
    summary, // string
    publisher, // string
    pageCount, // number
    readPage, // number
    reading, // boolead
  } = request.payload;

  let finished = Boolean;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (pageCount === readPage) {
    finished = true;
  } else {
    finished = false;
  }

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  booksShelf.push(newBooks);

  const isSuccess = booksShelf.filter((book) => book.id === id).length > 0; // menyimpan sebuah kondisi jika data benar benar masuk ke array notes. kalau iya maka true

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
        status:"fail",
        message:"Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    });
  }
  const response = h.response({
    status: "fail",
    message: "Gagal Menambahkan Buku. Mohon isi Nama Buku",
  });
  response.code(500);
  return response;
};
export { addBooksHandler };
