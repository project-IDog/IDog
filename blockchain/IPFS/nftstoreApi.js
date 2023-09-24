import dotenv from "dotenv";
import fetch from "node-fetch";
import { Blob } from "buffer";
import { NFTStorage } from "nft.storage";
import axios from 'axios';
import { promises as fs } from "fs"; // 이 부분이 이미 추가되어 있어야 합니다.


dotenv.config();

const apiKey = process.env.NFT_STORAGE_KEY;
const imagePath ="./images/yoonNft02.jpg"; //이미지 받아오는 곳

//이미지 변환 함수
const getImage = async (imagePath) => {
    // const r = await fetch(imageUrl);
    // if (!r.ok) {
    //   throw new Error(`error fetching image: [${r.status}]: ${r.statusText}`);
    // }
    // const buffer = await r.arrayBuffer();
    const buffer = await fs.readFile(imagePath);
    return new Blob([buffer], { type: "image/*" });
  };

//이미지 업로드 함수
const uploadImage = async() =>{
    const nft_storage_url = "https://api.nft.storage/upload";
    const blobImg = await getImage(imagePath);
    const response = axios.post(nft_storage_url, blobImg , {
                                headers: {
                                    'Authorization': `Bearer ${apiKey}`, 
                                    'Content-Type': 'application/octet-stream'
                                }
                            })
                            .then((res) => {
                                console.log(res.data.value);
                                //res.data.value.cid만 추출해서
                                // ipfs://<CID> 문자열로 만들어서 메타데이터에 넘김
                            })
                            .catch((err) => {
                                console.log(err);
                            });
    console.log(response);

}

//JSON파일 업로드 함수
const uploadMetaJSON = async () => {
    const nft_storage_url = "https://api.nft.storage/upload";
    const TEST_CID = process.env.TEST_CID;
    const metaData = {
        "dogName" : "윤둥이",
        "dogBirthDate" : "2016.12.01",
        "dogBreed" : "폼피츠",
        "dogSex" : "M",
        "imageCID" : TEST_CID //이미지 CID넣는 곳 (원래는 그냥 받아와서 넣으면 됨, 현재는 git에 공유하는 테스트용)
    }
    const response = axios.post(nft_storage_url, metaData , {
        headers: {
            'Authorization': `Bearer ${apiKey}`, 
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        console.log(res.data.value);
        //res.data.value.cid만 추출해서
        //DB에 저장할듯
    })
    .catch((err) => {
        console.log(err);
    });
console.log(response);
}

// uploadImage();
uploadMetaJSON();