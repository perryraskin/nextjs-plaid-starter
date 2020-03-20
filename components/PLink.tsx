import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import PlaidLink from "react-plaid-link";
import fetchSwal from '../lib/fetchSwal';

interface PLinkProps {

}

const PLink: NextPage<PLinkProps> = ({}) => {
  const [transactions, setTransactions] = useState(Object);

  function handleOnSuccess(public_token: any, metadata: any) {
    // send token to client server
    fetchSwal
      .post('/api/plaid', {
        public_token: public_token,
        metadata: metadata,
      })
      .then((res) => {
        if (res.ok !== false) {
          setTransactions({ transactions: res.transactions });
          //redirectTo('/');
        }
      });
  }

  function handleOnExit() {
    // handle the case when your user exits Link
    // For the sake of this tutorial, we're not going to be doing anything here.
  }

  function handleClick(res: any) {
    console.log('transactions:', transactions);
  }
  return(
    <div>
      <PlaidLink
        clientName="React Plaid Setup"
        env="sandbox"
        product={["auth", "transactions"]}
        publicKey={process.env.PLAID_PUBLIC_KEY!}
        onExit={handleOnExit}
        onSuccess={handleOnSuccess}
        style={{}}
        className="mt-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Connect your bank!
      </PlaidLink>
      <div>
        <button 
          onClick={handleClick}
          className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          View Transactions</button>
      </div>
    </div>
  )
}

export default PLink;