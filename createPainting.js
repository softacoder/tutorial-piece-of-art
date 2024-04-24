function createPaint() {
  // Construct a transaction payload
  const txCreatePaint = BigchainDB.Transaction.makeCreateTransaction(
    // Asset field
    {
      painting,
    },
    // Metadata field, contains information about the transaction itself
    // (can be `null` if not needed)
    {
      datetime: new Date().toString(),
      location: "Madrid",
      value: {
        value_eur: "25000000€",
        value_btc: "2200",
      },
    },
    // Output. For this case we create a simple Ed25519 condition
    [
      BigchainDB.Transaction.makeOutput(
        BigchainDB.Transaction.makeEd25519Condition(alice.publicKey)
      ),
    ],
    // Issuers
    alice.publicKey
  );
  // The owner of the painting signs the transaction
  const txSigned = BigchainDB.Transaction.signTransaction(
    txCreatePaint,
    alice.privateKey
  );

  // Send the transaction off to BigchainDB
  conn.postTransactionCommit(txSigned).then((res) => {
    document.body.innerHTML += "<h3>Transaction created</h3>";
    document.body.innerHTML += txSigned.id;
    // txSigned.id corresponds to the asset id of the painting
  });
}
