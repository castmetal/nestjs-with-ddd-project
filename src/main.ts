import 'dotenv/config';
import { bootstrap as startHttpServer } from './ports/http.server';

function startServer() {
  const serverType = process.env.SERVER_TYPE ?? 'HTTP_REST';

  switch (serverType) {
    case 'HTTP_REST':
      startHttpServer();
      break;
    default:
      startHttpServer();
  }
}

startServer();
