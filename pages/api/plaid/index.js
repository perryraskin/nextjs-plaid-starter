import nextConnect from 'next-connect';
import plaid from 'plaid';
import moment from 'moment';

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET_SANDBOX;
const PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY;
const PLAID_ENV = process.env.PLAID_ENV;

var ACCESS_TOKEN = null;
var ITEM_ID = null;

// Initialize the Plaid client
export const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
  { version: '2019-05-29', clientApp: 'Plaid Quickstart' }
);

const handler = nextConnect();

handler.post(async (req, res) => {
  const { metadata, public_token, userEmail } = req.body;
  const { institution, accounts } = metadata;
  const { name, institution_id } = institution;

  try {
    if (public_token) {
      client.exchangePublicToken(public_token, function(error, tokenResponse) {
        console.log('client: ', client);
        console.log('tokenResponse: ', tokenResponse);
        ACCESS_TOKEN = tokenResponse.access_token;
        ITEM_ID = tokenResponse.item_id;
        console.log("access token below");
        console.log(ACCESS_TOKEN);

        // Pull transactions for the last 30 days
        let startDate = moment()
        .subtract(30, "days")
        .format("YYYY-MM-DD");
        let endDate = moment().format("YYYY-MM-DD");
        console.log('ACCESS TOKEN ->', ACCESS_TOKEN);
        client.getTransactions(
          ACCESS_TOKEN,
          startDate,
          endDate,
          {
            count: 250,
            offset: 0
          },
          function(error, transactionsResponse) {
            const { transactions } = transactionsResponse;
            // TRANSACTIONS LOGGED BELOW! 
            // They will show up in the terminal that you are running the server in
            console.log('transactions:', transactions);
            res.json({
              ok: true,
              message: 'Success!',
              access_token: ACCESS_TOKEN,
              item_id: ITEM_ID,
              transactions: transactions
            })
            
          }
        );
      })
      .catch(err => res.json({
        ok: false,
        message: err.toString(),
      })); // Plaid Error
  }
  } catch (err) {
    res.json({
      ok: false,
      message: err.toString(),
    });
  }
});

export default handler;
