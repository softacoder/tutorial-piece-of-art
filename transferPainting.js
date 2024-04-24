function transferOwnership(txCreatedID, newOwner) {
  // Get transaction payload by ID
  conn
    .getTransaction(txCreatedID)
    .then((txCreated) => {
      const createTranfer = BigchainDB.Transaction.makeTransferTransaction(
        // The output index 0 is the one that is being spent
        [
          {
            tx: txCreated,
            output_index: 0,
          },
        ],
        [
          BigchainDB.Transaction.makeOutput(
            BigchainDB.Transaction.makeEd25519Condition(newOwner.publicKey)
          ),
        ],
        {
          datetime: new Date().toString(),
          value: {
            value_eur: "30000000€",
            value_btc: "2100",
          },
        }
      );
      // Sign with the key of the owner of the painting (Alice)
      const signedTransfer = BigchainDB.Transaction.signTransaction(
        createTranfer,
        alice.privateKey
      );
      return conn.postTransactionCommit(signedTransfer);
    })
    .then((res) => {
      document.body.innerHTML += "<h3>Transfer Transaction created</h3>";
      document.body.innerHTML += res.id;
    });
}
