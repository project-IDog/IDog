import React, { ChangeEvent, FC, useState } from "react";
import AnimalCard from "./AnimalCard";
import { saleAnimalTokenContract, web3 } from "../contracts";

export interface IMyAnimalCard {
    animalTokenId : string;
    animalType : string;
    animalPrice : string;
}

interface AnimalCardProps extends IMyAnimalCard{
    saleStatus: boolean;
    account : string;
}

const MyAnimalCard: FC<AnimalCardProps> = ({animalTokenId, animalType, animalPrice, saleStatus, account}) => {

    const [sellPrice, setSellPrice] = useState<string>("");
    const [myAnimalPrice , setMyAnimalPrice] = useState<string>(animalPrice);

    const onChangeSellPrice = (e: ChangeEvent<HTMLInputElement>) => {
        setSellPrice(e.target.value);
    }

    const onClickSell =async () => {
        try {
            if(!account || !saleStatus) return;

            const response = await saleAnimalTokenContract.methods
                                    .setForSaleAnimalToken(animalTokenId, web3.utils.toWei(sellPrice, "ether"))
                                    .send({from:account});
            console.log(response);
            if(response.status){
                setMyAnimalPrice(web3.utils.toWei(sellPrice, "ether"));
            }

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            <AnimalCard animalType={animalType} />
            <div>
                {myAnimalPrice ==="0" ? (
                    <>
                        <div>
                            <input type="number" value={sellPrice} onChange={onChangeSellPrice}/>
                            <button onClick={onClickSell}>Sell</button>
                        </div>
                    </>
                ) : (<div>{web3.utils.fromWei(myAnimalPrice)} MATIC</div>)}
            </div>
        </div>
    );
};

export default MyAnimalCard;