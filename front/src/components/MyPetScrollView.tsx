import {useState} from "react";
import {View, Text, TouchableOpacity, Image, ScrollView} from "react-native";

import MyPetThumbnail1 from "../../assets/images/my-pet-thumbnail1.png"
import MyPetThumbnail2 from "../../assets/images/my-pet-thumbnail2.png"

import MyPetScrollViewLayout from "../styles/myPetScrollViewLayout";

const MyPetScrollView = () => {
    const [selectedImages, setSelectedImages] = useState<number[]>([]);

    const [myPetList, setMyPetList] = useState<Object[]>(
        [
            {
                id:1,
                url:MyPetThumbnail1
            },
            {
                id:2,
                url:MyPetThumbnail2
            }
        ]
    );

    const toggleImageSelection = (id: number) => {
        const isSelected = selectedImages.includes(id);
    
        if (isSelected) {
            setSelectedImages(selectedImages.filter((imageId) => imageId !== id));
        } else {
            setSelectedImages([...selectedImages, id]);
        }
    };

    return (
        <>  
            <ScrollView horizontal={true} style={MyPetScrollViewLayout.myPetContent}>
                {
                    myPetList.map((myPetImage: Object, index: number) => {
                        return(     
                            <TouchableOpacity activeOpacity={0.7} onPress={() => toggleImageSelection(myPetImage.id)} key={index}>
                                <View style={MyPetScrollViewLayout.myPetItem}>
                                    <Image
                                        source={myPetImage.url}
                                        style={{
                                            borderWidth: 4,
                                            borderColor: selectedImages.includes(myPetImage.id) ? '#EE8A72' : 'transparent',
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </>
    );
}

export default MyPetScrollView;