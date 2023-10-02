FROM node:18-alpine

# package 내에 설정된 라이브러리들 현재 위치에 복사
COPY package*.json ./

RUN npm install

# 모든 파일들 현재 위치에 복사
COPY . .


CMD ["npm", "run", "dev"]
