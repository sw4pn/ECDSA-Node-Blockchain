import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) {
  async function onChange(evt) {
    const cPrivateKey = evt.target.value;
    setPrivateKey(cPrivateKey);

    const address = toHex(secp256k1.getPublicKey(cPrivateKey));
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        {/* Wallet Address */}
        Private key
        <input
          placeholder="Type an address, for example: 0x1"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>

      <div className="">Address: {address} </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
