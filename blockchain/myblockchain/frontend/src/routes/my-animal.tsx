import React, {FC, useEffect, useState} from "react";
import { mintAnimakTokenContract, saleAnimalTokenAddress } from "../contracts";
import AnimalCard from "../components/AnimalCard";

interface MyAnimalProps {
    account:string;
}

const MyAnimal: FC<MyAnimalProps> = ({account}) => {
const [animalCardArray, setAnimalCardArray] = useState<string[]>();
const [saleStatus, setSaleStatus] = useState<boolean>(false);

const getAnimalTokens = async () => {
    try {
        const balanceLength = await mintAnimakTokenContract.methods.balanceOf(account).call();

        const tempAnimalCardArray = [];

        for(let i=0; i <parseInt(balanceLength,10); i++){
            const animalTokenId = await mintAnimakTokenContract.methods.tokenOfOwnerByIndex(account, i).call();
            const animalType = await mintAnimakTokenContract.methods.animalTypes(animalTokenId).call();
            tempAnimalCardArray.push(animalType);
        }
        setAnimalCardArray(tempAnimalCardArray);
    } catch (error) {
        console.log(error);
    }
};
    const getIsApprovedForAll =async () => {
        try {
            const response = await mintAnimakTokenContract.methods.isApprovedForAll(account, saleAnimalTokenAddress).call();
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
            const response = await mintAnimakTokenContract.methods.setApprovalForAll(saleAnimalTokenAddress, !saleStatus).send({from:account});
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
                return <AnimalCard key={index} animalType={src}></AnimalCard>
            })}
        </div>
        </>
    );
}

export default MyAnimal;