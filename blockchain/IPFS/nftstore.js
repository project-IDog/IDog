import dotenv from "dotenv";
import fetch from "node-fetch";
import { Blob } from "buffer";
import { NFTStorage } from "nft.storage";

dotenv.config();

const apiKey = process.env.NFT_STORAGE_KEY;
const client = new NFTStorage({ token: apiKey });
const imageUrl =
  "http://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg";

const getImage = async (imageUrl) => {
  const r = await fetch(imageUrl);
  if (!r.ok) {
    throw new Error(`error fetching image: [${r.status}]: ${r.statusText}`);
  }
  const buffer = await r.arrayBuffer();
  return new Blob([buffer], { type: "image/jpg" });
};

// ===== 강아지 nft 업로드 시작 =====
const storeMetaData = async () => {
  // 주인 정보 넣을지 ?
  const dogName = "강아지 이름";
  const dogBirthDate = "생일";
  const dogBreed = "견종";
  const dogGender = "강아지 성별";
  const dogImage = await getImage(imageUrl);

  const dogNft = {
    image: dogImage,
    name: dogName,
    description: "강아지 NFT에 담길 메타데이터들 입니다.",
    properties: {
      birthDate: dogBirthDate,
      breed: dogBreed,
      gender: dogGender,
    },
  };

  const dogNftMetadata = await client.store(dogNft);
  console.log("dogNFT data stored!");
  console.log("dogNftMetadata URI: ", dogNftMetadata.url);
};

storeMetaData();
