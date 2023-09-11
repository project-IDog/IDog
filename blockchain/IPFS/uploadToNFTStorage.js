const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const NFT_STORAGE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA1NUNkMTgxOWMyQjU3ODk3ZGMxMkFGZUUyYzQ1MjFCMTMyRTNGRTYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NDM1MzMxODEyNiwibmFtZSI6Imlkb2cifQ.UL_uK_fnad6cFwka2h50BxUgPOnej70BT3Y_nOikuUo";

async function uploadToNFTStorage() {
  const form = new FormData();

  // 메타데이터 추가
  form.append('name', '강아지 프로필');
  form.append('description', '이것은 강아지의 NFT 프로필입니다.');

  // 속성 추가
  const properties = {
    birth: '2020-01-01',
    name: '멍멍이',
    breed: '시츄',
    gender: '남'
  };
  form.append('properties', JSON.stringify(properties));

  // 이미지 추가 (여기서는 예시로 동일한 디렉토리에 있는 'dog.jpg' 파일을 사용)
  form.append('image', fs.createReadStream('./dog.jpg'), 'dog.jpg');

  // NFT.Storage에 업로드
  try {
    const response = await axios.post('https://api.nft.storage/upload', form, {
      headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer ${NFT_STORAGE_API_KEY}`
      }
    });
    console.log("NFT 성공적으로 저장:", response.data);
  } catch (error) {
    console.log("NFT 저장 실패:", error);
  }
}

// 함수 실행
uploadToNFTStorage();
