import { async } from "q";
import React, {FC, useState} from "react";
import { mintAnimakTokenContract } from "../contracts";
import AnimalCard from "../components/AnimalCard";

interface MainProps {
    account: string;
}

const Main: FC<MainProps> = ({account}) => {
    const [newAnimalType, setNewAnimalType] = useState<string>();

    const onClickMint = async () => {
        try {
            if(!account) return;
            const response = await mintAnimakTokenContract.methods.mintAnimakToken().send({from: account});
            // console.log(response);
            if(response.status) {
                const balanceLength = await mintAnimakTokenContract.methods.balanceOf(account).call();
                const animalTokenId = await mintAnimakTokenContract.methods.tokenOfOwnerByIndex(account, parseInt(balanceLength.length,10)-1).call();
                const animalType = await mintAnimakTokenContract.methods.animalTypes(animalTokenId).call();
                console.log(animalType);
                setNewAnimalType(animalType);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return <>
        <div>
            {newAnimalType ? (<AnimalCard animalType={newAnimalType}></AnimalCard>) : (<div>Let's mint animal card!!</div>) }
        </div>
        <button onClick={onClickMint}>mint</button>
    </>;
}

export default Main;