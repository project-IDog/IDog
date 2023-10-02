const express = require('express');
const ethers = require('ethers');
const cryptojs = require('crypto-js');
const fs = require('fs');
const AWS = require('aws-sdk');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const BUCKET_NAME = process.env.BUCKET_NAME;

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const encryptValue = (value, secretkey) => {
    const ciphertext = cryptojs.AES.encrypt(value, secretkey).toString();
    return ciphertext;
};

const decryptValue = (encrypted, secretkey) => {
    const bytes = cryptojs.AES.decrypt(encrypted, secretkey);
    const originalText = bytes.toString(cryptojs.enc.Utf8);
    return originalText;
};

const save = async (key, value) => {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (error) {
        console.log("Failed to save to store:", error);
    }
};

const getValueFor = async (key) => {
    if (result) {
        return result;
    } else {
        console.log("No values stored under that key.");
    }
};

app.post('/imageToServer', async (req,res) => {
    const url = req.body.url;
    console.log("url", url);
    const fileNameOrigin = url.split('/')[url.split('/').length-1];
    console.log("fileNameOrigin", fileNameOrigin);

    const downloadFile = async (fileName) => {
        const params = {
            Bucket: BUCKET_NAME,
            Key: fileNameOrigin,
        };

        s3.getObject(params, (err, data) => {
            if(err){
                throw err;
            }

            fs.writeFileSync(fileName, data.Body.toString());
        });
    };

    await downloadFile(`./${fileNameOrigin}`)
    setTimeout(async () => {
        await res.send(fileNameOrigin);
    }, 5000)

})

app.post('/uploadIpfs', async (req,response) => {
    const img = req.body.img;
    const petName = req.body.petName;
    const petSpecies = req.body.petSpecies;
    const petBirth = req.body.petBirth;
    const petGender = req.body.petGender;

    const nft_storage_url = "https://api.nft.storage/upload";
    const getImage = async () => {
        const buffer = await fs.readFileSync(__dirname + "/" + String(img));
        return new Blob([buffer], { type: "image/*" });
    };
    const blobImg = await getImage();
    await axios.post(nft_storage_url, blobImg , {
        headers: {
            'Authorization': `Bearer ${process.env.NFT_STORAGE_KEY}`, 
            'Content-Type': 'application/octet-stream'
        }
    }).then(async (res) => {
        console.log("cid", res.data.value.cid);
        const nft_storage_url = "https://api.nft.storage/upload";
        const metaData = {
            "name" : petName,
            "description" : "",
            "image": `ipfs://${res.data.value.cid}`,
            "attributes" : [
                {"trait_type":"dogName", "value":petName},
                {"trait_type":"dogBreed", "value":petSpecies},
                {"trait_type":"dogbirth", "value":petBirth},
                {"trait_type":"dogSex", "value":petGender}
            ],
        }
        await axios.post(nft_storage_url, metaData , {
            headers: {
                'Authorization': `Bearer ${process.env.NFT_STORAGE_KEY}`, 
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            console.log("nftCid", res.data.value.cid);
            response.send(res.data.value.cid);
        })
        .catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
});


app.get('/upload-ipfs', async (req,res) => {
    const apiKey = process.env.NFT_STORAGE_KEY;
    const imagePath ="/badge-10.png";
        

    //JSON파일 업로드 함수
    const uploadMetaJSON = async () => {
        
        console.log(response);
    }

    // uploadImage();
    uploadMetaJSON();
})

app.get('/', async (req,res) => {
    try{
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
        const newWallet = ethers.Wallet.createRandom(provider);
        const newMnemonic = await newWallet.mnemonic;
        const encryptedValue = await encryptValue(newMnemonic?.phrase, process.env.SECRET_SALT);
        
        console.log("뉴모닉", newMnemonic.phrase);
        res.send(String(encryptedValue));
    } catch (error) {
        console.error("Error generating wallet:", error);
    }
})

app.listen(port, () => {
    console.log(`server start on ${port} port`);
})