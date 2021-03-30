const { AccountsServer } = require("@accounts/server");
const { AccountsPassword } = require("@accounts/password");
const mongoose = require("mongoose");
const { Mongo } = require("@accounts/mongo");
const { AccountsModule } = require("@accounts/graphql-api");

const accountJS = async () => {
  const accountsMongo = new Mongo(mongoose.connection);

  const accountsPassword = new AccountsPassword({
    // You can customise the behavior of the password service by providing some options
  });

  const accountsServer = new AccountsServer(
    {
      // We link the mongo adapter we created in the previous step to the server
      db: accountsMongo,
      // Replace this value with a strong random secret
      tokenSecret: "my-super-random-secret",
    },
    {
      // We pass a list of services to the server, in this example we just use the password service
      password: accountsPassword,
    }
  );

    // We generate the accounts-js GraphQL module
    const accountsGraphQL = AccountsModule.forRoot({ accountsServer });

};
module.exports = accountJS;
