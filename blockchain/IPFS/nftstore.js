import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { Blob } from 'buffer';
import { NFTStorage } from 'nft.storage';

dotenv.config();

const apiKey = process.env.NFT_STORAGE_KEY;

// For example's sake, we'll fetch an image from an HTTP URL.
// In most cases, you'll want to use files provided by a user instead.
const getExampleImage = async () => {
    const imageOriginUrl = "https://gentlysallim.com/wp-content/uploads/2020/02/200209_1.jpg";
    const r = await fetch(imageOriginUrl);
    if (!r.ok) {
      throw new Error(`error fetching image: [${r.status}]: ${r.statusText}`);
    }
    const buffer = await r.arrayBuffer();
    return new Blob([buffer], { type: "image/jpg" });
};
  
const storeExampleNFT = async () => {
  const image = await getExampleImage();
  const nft = {
    image,
    name: "nft1",
    description: "The metaverse is here. Where is it all being stored?",
    properties: {
      type: "blog-post",
      origins: {
        http: "https://blog.nft.storage/posts/2021-11-30-hello-world-nft-storage/",
        ipfs: "ipfs://bafybeieh4gpvatp32iqaacs6xqxqitla4drrkyyzq6dshqqsilkk3fqmti/blog/post/2021-11-30-hello-world-nft-storage/"
      },
      authors: [{ name: "David Choi" }],
      content: {
        "text/markdown": "The last year has witnessed the explosion of NFTs onto the world’s mainstage. From fine art to collectibles to music and media, NFTs are quickly demonstrating just how quickly grassroots Web3 communities can grow, and perhaps how much closer we are to mass adoption than we may have previously thought. <... remaining content omitted ...>"
      }
    }
  };

  const client = new NFTStorage({ token: apiKey });
  const metadata = await client.store(nft);

  console.log('NFT data stored!');
  console.log('Metadata URI: ', metadata.url);
};

storeExampleNFT();


// const apiKey = process.env.NFT_STORAGE_KEY;
// const client = new NFTStorage({ token: apiKey });

// async function storeMetadata() {
//   const metadata = await client.store({
//     name: 'My NFT',
//     description: 'This is my first NFT',
//     image: new File([/* data */], 'image.png', { type: 'image/png' })
//   });
//   return metadata.url;
// }

