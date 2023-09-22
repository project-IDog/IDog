import React, {FC, useEffect, useState} from "react";
import { saleAnimalTokenAddress, mintAnimalTokenContract, saleAnimalTokenContract } from "../contracts";
import MyAnimalCard from "../components/MyAnimalCard";
import { IMyAnimalCard } from "../components/MyAnimalCard";

interface MyAnimalProps {
    account:string;
}

const MyAnimal: FC<MyAnimalProps> = ({account}) => {
const [animalCardArray, setAnimalCardArray] = useState<IMyAnimalCard[]>();
const [saleStatus, setSaleStatus] = useState<boolean>(false);

const getAnimalTokens = async () => {
    try {
        const balanceLength = await mintAnimalTokenContract.methods.balanceOf(account).call();

        const tempAnimalCardArray = [];

        for(let i=0; i <parseInt(balanceLength,10); i++){
            const animalTokenId = await mintAnimalTokenContract.methods.tokenOfOwnerByIndex(account, i).call();
            const animalType = await mintAnimalTokenContract.methods.animalTypes(animalTokenId).call();

            const animalPrice = await saleAnimalTokenContract.methods.animalTokenPrices(animalTokenId).call();

            tempAnimalCardArray.push({animalTokenId, animalType, animalPrice});
        }
        setAnimalCardArray(tempAnimalCardArray);
    } catch (error) {
        console.log(error);
    }
};
    const getIsApprovedForAll =async () => {
        try {
            const response = await mintAnimalTokenContract.methods.isApprovedForAll(account, saleAnimalTokenAddress).call();
            if(response) {
                setSaleStatus(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onClickApproveToggle =async () => {
        try {
            if(!account) return;
            const response = await mintAnimalTokenContract.methods.setApprovalForAll(saleAnimalTokenAddress, !saleStatus).send({from:account});
            if(response.status) {
                setSaleStatus(!saleStatus);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(!account) return;
        getIsApprovedForAll();
        getAnimalTokens();
    },[account]);

    useEffect(()=> {
        console.log(animalCardArray);
    }, [animalCardArray]);

    return (
        <>
        <div>
            <div>Sale status : {saleStatus ? "true" : "false"}</div>
            <button onClick={onClickApproveToggle}>{saleStatus ? "Cancel" : "Approve"}</button>
        </div>
        <div className="grid-container">
            {animalCardArray && animalCardArray.map((src, index) => {
                return (
                    <MyAnimalCard 
                        key={index} 
                        animalTokenId={src.animalTokenId} 
                        animalType={src.animalType} 
                        animalPrice={src.animalPrice} 
                        saleStatus={saleStatus}
                        account={account}
                    />
                );
            })}
        </div>
        </>
    );
}

export default MyAnimal;