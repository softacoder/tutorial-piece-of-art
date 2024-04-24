const bip39 = require("bip39");

const seed = bip39.mnemonicToSeed("seedPhrase").slice(0, 32);
const alice = new BigchainDB.Ed25519Keypair(seed);
