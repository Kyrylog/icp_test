import { useState, useEffect } from "react";
import { hello_bachelor_rust_backend } from "declarations/hello_bachelor_rust_backend";
import { ethers } from "ethers";

function App() {
  const [greeting, setGreeting] = useState("");
  const [rate, setRate] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    hello_bachelor_rust_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    hello_bachelor_rust_backend.get_icp_usd_exchange().then((bal)=>{
      setRate(bal);

    })
    return false;
  }
  const [provider, setProvider] = useState(null);
  const [bal, setBal] = useState(null);

  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const network = new ethers.Network("Whitechain Testnet", 2625);
        const provider = new ethers.JsonRpcProvider(
          "https://rpc-testnet.whitechain.io",
          network,
          { staticNetwork: network }
        );
        const balance = await provider.getBalance(
          "0x4546F3147F094af3628531fA04FCE3347fC5D25D"
        );
        setBal(ethers.formatEther(balance));
        setProvider(provider);
      }
    };

    initializeProvider();
  }, []);

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <div>ICP to USD prics: {greeting}</div>

      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">Greeting: {greeting}</section>
      <section id="rate">Rate: {rate}</section>
      <section id="balance">Balance: {bal}</section>

    </main>
  );
}

export default App;
