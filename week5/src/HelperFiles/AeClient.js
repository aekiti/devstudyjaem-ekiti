import {Aepp} from '@aeternity/aepp-sdk';
import Config from '../Config/Config';
const getClient=async()=> {
    try {
        
        console.log("after getting contractDetails");
        // Aepp approach
        let client = await Aepp({
            parent:window.parent
            //parent: this.runningInFrame ? window.parent : await this.getReverseWindow()
        });
        console.log("after waiting for iframe");
        let contractInstance = await client.getContractInstance(Config.contractSource, { contractAddress: Config.contractAddress });
        console.log("After contract instance instantiation");
        return  contractInstance;
  
    } catch (err) {
        console.error(err);
    }
  }

  export default getClient;