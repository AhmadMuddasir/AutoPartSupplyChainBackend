const {ethers} = require("hardhat");

const deployScript =  async()=>{
     try {         
          const Contract = await ethers.getContractFactory("AutoPartNFT_Pro");
          const contract = await Contract.deploy();
          await contract.waitForDeployment();
          console.log("contract address:",await contract.getAddress());
     } catch (error) {
          console.log(error)
     }
}
// contractaddress = 0xE5B5eb879fD597d83Ae99FBe96cfeA727022832A

//new = 0x5FbDB2315678afecb367f032d93F642f64180aa3
deployScript();