import {
  createServer,
  Model,
  ActiveModelSerializer,
  Factory,
  hasMany,
  belongsTo,
} from "miragejs";
import { faker } from "@faker-js/faker";

type Employee = {
  name: string;
  email: string;
  created_at: string;
};

interface Transaction {
  amount: number;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      employee: Model.extend<Partial<Employee>>({}),
      transaction: Model.extend<Partial<Transaction>>({}),
    },

    factories: {
      employee: Factory.extend({
        name() {
          return faker.name.findName();
        },
        email() {
          return faker.internet.email();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
      transaction: Factory.extend({
        amount() {
          return faker.finance.amount(3000, 10000, 2, "", false);
        },
        createdAt() {
          return faker.date.recent(7);
        },
        employeerId() {
          return faker.datatype.number({ min: 1, max: 10 });
        },
      }),
    },

    seeds(server) {
      server.createList("employee", 10);
      server.createList("transaction", 10);
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("employees");
      this.get("transactions", (schema, request) => {
        const transactions = schema.db.transactions;
        const updatedTransactions = transactions.map((transaction) => {
          const employee = schema.employees.find(transaction.employeerId);

          const { employeerId, ...filteredData } = transaction;

          return {
            ...filteredData,
            employee: employee,
          };
        });

        return {
          transactions: updatedTransactions,
        };
      });

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
