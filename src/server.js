import Hapi from "@hapi/hapi";
import routes from "./routes.js";
const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"], // bintang berarti seluruh alamat origin, bisa tidak pake bintang atau spesifik originnya (penting untuk menghubungkan origin backend dan frontend karena portnya berbeda)
      },
    },
  });

  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
