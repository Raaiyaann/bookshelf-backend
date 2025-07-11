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
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }
  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  const finished = pageCount === readPage;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
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
};

// menampilkan seluruh buku (hanya 3 properti saja ditampilkan)
const getAllBooksHandler = (request, h) => {
  const books = booksShelf.map((book) => ({
    // ini nanti artinya setiap data dari bookShelf di mapping, lalu data tertentu dikases menggunakan objek book
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
  const response = h.response({
    status: "success",
    data: {
      books,
    },
  });
  response.code(200);
  return response;
};

// menampilkan buku secara detail agar lebih detail untuk pengaksesannya
const getBooksByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = booksShelf.find((b) => b.id === id); // kalau misalkan tidak ada buku dalam booksShelf, nanti nilai yang dikembalikan undefined, maka cara menanganinya seperti dibawah
  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book, // menampilakan data buku yang id nya sudah di deteksi sama dengan dengan parameter request pada fungsi filter
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

// update buku
const updateBookByIdHandler = (request, h) => {
  const { id } = request.params;
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
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  } 
  if (!name) { 
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  const index = booksShelf.findIndex((book) => book.id === id);

  if (index !== -1) {
    const updatedAt = new Date().toISOString();
    const finished = pageCount === readPage;
    booksShelf[index] = {
      ...booksShelf[index],
      name,
      year, // number
      author, // string
      summary, // string
      publisher, // string
      pageCount, // number
      readPage, // number
      reading, // boolead
      finished,
      updatedAt,
    };
    return h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// menghapus buku
const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = booksShelf.findIndex((book) => book.id === id); // id yang di data booksShelf harus sama dengan id yang diminta client

  if (index !== -1) {
    booksShelf.splice(index, 1); // hapus pada posisi 'index' dan hanya 1 element saja yang dihapus
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

export {
  addBooksHandler,
  getAllBooksHandler,
  getBooksByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler
};
