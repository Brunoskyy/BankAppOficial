import { createServer, Model, ActiveModelSerializer, Factory } from "miragejs";
import { faker } from "@faker-js/faker";

type Employee = {
  name: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      employee: Model.extend<Partial<Employee>>({}),
    },

    factories: {
      employee: Factory.extend({
        name(i: number) {
          return faker.name.findName();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },

    seeds(server) {
      server.createList("employee", 10); //It will create  users based on the factory defined above.
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("employees");

      this.post("login", (schema, request) => {
        const user = JSON.parse(request.requestBody);
        const { email, password } = user.data;

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
