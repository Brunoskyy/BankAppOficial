import { createServer, Model, ActiveModelSerializer } from "miragejs";

type User = {
  name: string;
  email: string;
  password: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("users");

      this.post("login", (schema, request) => {
        const user = JSON.parse(request.requestBody);
        const { email, password } = user.data;
        debugger;
        if (email === "admin@mail.com" && password === "123") {
          return {
            statusCode: 200,
          };
        }

        return {
          statusCode: 401,
        };
      });
    },
  });

  return server;
}
