const anchor = require("@project-serum/anchor");

describe("solana-src", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const baseAccount = anchor.web3.Keypair.generate()
  const program = anchor.workspace.SolanaSrc;
  it("Is initialized!", async () => {
    // Add your test here.
    
    const tx = await program.rpc.initialize({
      accounts:{
        baseAccount : baseAccount.publicKey,
        user : provider.wallet.publicKey,
        systemProgram : anchor.web3.SystemProgram.programId
      },
      signers:[baseAccount]
    });

    console.log("Your transaction signature", tx);
    let account = await program.account.baseAccount.fetch(baseAccount.publicKey)
    console.log("GIF count",account.totalGifs.toString())
  });



  it("Adds the new gif",async()=>{
    const tx = await program.rpc.addGif("https://media.giphy.com/media/yJEj0cui18FBUzUMV2/giphy.gif",{
      accounts:{ 
        baseAccount : baseAccount.publicKey,
        user: provider.wallet.publicKey
      }
    });
    // console.log("Your transaction signature", tx);
    let account = await program.account.baseAccount.fetch(baseAccount.publicKey)
    console.log("GIF count",account.totalGifs.toString())
    console.log("GIF LIST : ",account.gifList)
  });
});
