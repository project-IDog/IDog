import React, {FC} from "react";

interface AnimalCardProps {
    animalType: string;
}

const AnimalCard: FC<AnimalCardProps> = ({animalType}) => {
    return <img src={`images/${animalType}.png`} alt="AnimalCard"/>
}

export default AnimalCard;