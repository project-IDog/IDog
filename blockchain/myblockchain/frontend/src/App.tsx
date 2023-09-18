import React, { FC, useEffect , useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom"

import Main from "./routes/main";
import Layout from "../src/components/Layout"
import MyAnimal from "./routes/my-animal";


const App: FC = () => {
  const [account , setAccount] = useState<string>("");

  const getAccount = async () => {
    try {
      if(window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
      }else{
        alert("Install Metamask!!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // console.log(account);
    getAccount();
  }, [account]);

  // useEffect(() => {
  //   console.log(account);
  //   // getAccount();
  // }, [account]);


  return(
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main account={account}/>}></Route>
          <Route path="my-animal" element={<MyAnimal account={account}/>}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
