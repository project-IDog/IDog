import dotenv from "dotenv";
import fetch from "node-fetch";
import { Blob } from "buffer";
import { NFTStorage } from "nft.storage";

dotenv.config();

const apiKey = process.env.NFT_STORAGE_KEY;
const client = new NFTStorage({ token: apiKey });
const imageUrl =
  "https://gentlysallim.com/wp-content/uploads/2020/02/200209_1.jpg";

// For example's sake, we'll fetch an image from an HTTP URL.
// In most cases, you'll want to use files provided by a user instead.
const getImage = async (imageUrl) => {
  const r = await fetch(imageUrl);
  if (!r.ok) {
    throw new Error(`error fetching image: [${r.status}]: ${r.statusText}`);
  }
  const buffer = await r.arrayBuffer();
  return new Blob([buffer], { type: "image/jpg" });
};

const storeExampleNFT = async () => {
  const image = await getImage(imageUrl);
  const nft = {
    image,
    name: "nft1",
    description: "The metaverse is here. Where is it all being stored?",
    properties: {
      type: "blog-post",
      origins: {
        http: "https://blog.nft.storage/posts/2021-11-30-hello-world-nft-storage/",
        ipfs: "ipfs://bafybeieh4gpvatp32iqaacs6xqxqitla4drrkyyzq6dshqqsilkk3fqmti/blog/post/2021-11-30-hello-world-nft-storage/",
      },
      authors: [{ name: "David Choi" }],
      content: {
        "text/markdown":
          "The last year has witnessed the explosion of NFTs onto the world’s mainstage. From fine art to collectibles to music and media, NFTs are quickly demonstrating just how quickly grassroots Web3 communities can grow, and perhaps how much closer we are to mass adoption than we may have previously thought. <... remaining content omitted ...>",
      },
    },
  };

  const metadata = await client.store(nft);

  console.log("NFT data stored!");
  console.log("Metadata URI: ", metadata.url);
  console.log("metadata : ", metadata.ipnft);

  return metadata.ipnft;
};

const imageIpfsCID = await storeExampleNFT(imageUrl);

const getUploadedImage = async (imageIpfsCID) => {
  const url = "https://ipfs.io/ipfs/" + imageIpfsCID + "/metadata.json";
  console.log(url);

  const imageMetadata = await fetch(url);

  if (!imageMetadata.ok) {
    console.log("Fetching Error !!");
  }

  const metadata = await imageMetadata.json();
  console.log("image meta data : ", metadata);
  return metadata;
};

const imageMetadata = await getUploadedImage(imageIpfsCID);
const imageIpfsUrl = async () => {
  let imageUrl = imageMetadata.image;
  console.log(
    "image url : ",
    imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/")
  );
  return imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
};

// 강아지 nft 업로드
const storeMetaData = async () => {
  // 주인 정보 ?
  const dogName = "";
  const dogBirthDate = "";
  const dogBreed = "";
  const dogGender = "";
  const dogImage = "ipfs://" + imageIpfsCID + "/metadata.json";
  const imageUrl = await imageIpfsUrl();
  const imageBLOB = await getImage(imageUrl);

  const dogNft = {
    image: imageBLOB,
    name: "dogNft",
    description: "",
    properties: {
      name: dogName,
      birthDate: dogBirthDate,
      breed: dogBreed,
      gender: dogGender,
      image: dogImage,
    },
  };

  const dogNftMetadata = await client.store(dogNft);
  console.log("dogNFT data stored!");
  console.log("dogNftMetadata URI: ", dogNftMetadata.url);
};

storeMetaData(imageMetadata);
