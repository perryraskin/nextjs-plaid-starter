import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import PlaidLink from "react-plaid-link";
import axios from "axios";

interface PLinkProps {

}

const PLink: NextPage<PLinkProps> = ({}) => {
  const [transactions, setTransactions] = useState(Object);

  function handleOnSuccess(public_token: any, metadata: any) {
    // send token to client server
    axios.post("/auth/public_token", {
      public_token: public_token
    });
  }

  function handleOnExit() {
    // handle the case when your user exits Link
    // For the sake of this tutorial, we're not going to be doing anything here.
  }

  function handleClick(res: any) {
    axios.get("/transactions").then(res => {
      setTransactions({ transactions: res.data });
    });
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
        className="test"
      >
        Open Link and connect your bank!
      </PlaidLink>
      <div>
        <button onClick={handleClick}>Get Transactions</button>
      </div>
    </div>
  )
}

export default PLink;