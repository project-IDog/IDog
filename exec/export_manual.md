# 포팅 매뉴얼

# 📘 IDog 프로젝트 배포 가이드

```
[ 개발 환경 ]

VS Code : 1.81.1
IntelliJ : 17.0.7+10-b829.16 amd64
Remix IDE

spring boot : 2.7.13
JDK : OpenJDK 11.0.18
JVM : JDK와 동일
expo: 49.0.8
react-native: 0.72.4
mobx: 6.10.2
npm: 10.1.0
node.js: 18.16.1
express: 4.18.2
sentry: 7.0.0
jest: 29.6.4
ethers.js: 6.7.1
```

```
[ DB ]

mariaDB : 11.1.2-MariaDB, client 15.2
redis : 7.2.1
```

```
[ 서버 환경 ]

EC2 Ubuntu 20.04 LTS
nginx : 1.18.0 (Ubuntu)
certbot: 2.7.0
docker: 24.0.6
jenkins: 2.414.1
sonarqube: 10.2
```

```
[ 외부 서비스 ]

AWS S3
NFT.Storage
PolygonScan
```

```
[ 협업 툴 ]

Notion
MatterMost
Jira
Discord
Gitlab
```

## 초기 세팅

### git clone

```bash
git clone https://lab.ssafy.com/s09-blockchain-nft-sub2/S09P22A209.git
```

### mariaDB 실행

```bash
# mariaDB 이미지 받기
docker pull mariadb:latest

# mariaDB 실행
docker run --name mariadb -d -p 3306:3306 mariadb:latest
```

### redis 실행

```bash
# redis image
docker pull redis

# run redis
docker run -d -p 6379:6379 --name redis redis:latest --requirepass "비밀번호"
```

## Nginx

### 방화벽 설정

```bash
sudo ufw default deny incoming // 모든 인바운드 연결 차단
sudo ufw default allow outgoing // 모든 아웃바운드 연결 허용
sudo ufw allow ssh // 22번 포트 허용
sudo ufw allow http // 80번 포트 허용
sudo ufw allow https // 443번 포트 허용
sudo ufw enable

sudo ufw status
```

### Nginx 설치

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install nginx
sudo service nginx start

# Nginx 삭제
sudo apt-get -y remove --purge nginx nginx-full nginx-common
```

### 도메인 적용

![dns_setting](/exec/images/dns_setting.png)

### SSL 적용

```bash
wget https://dl.eff.org/certbot-auto
# snap을 이용하여 core 설치 -> snap을 최신 버전으로 유지하기 위해 설치
sudo snap install core

# core를 refresh 해준다.
sudo snap refresh core

# 기존에 잘못된 certbot이 설치되어있을 수도 있으니 삭제 해준다.
sudo apt remove certbot

# certbot 설치
sudo snap install --classic certbot

# certbot 명령을 로컬에서 실행할 수 있도록 snap의 certbot 파일을 로컬의 cerbot과 링크(연결) 시켜준다. -s 옵션은 심볼릭링크를 하겠다는 것.
ln -s /snap/bin/certbot /usr/bin/certbot
```

```bash
sudo certbot --nginx

# 2. 공개키 경로
/etc/letsencrypt/live/idog.store/fullchain.pem

# 3. 비밀키 경로
 /etc/letsencrypt/live/idog.store/privkey.pem
```

### Nginx.conf

spring, express 서버 설정

```bash
upstream backend {
	server 127.0.0.1:8080;
}

upstream blockchain {
	server 127.0.0.1:3000;
}

server {
	listen 80;
	server_name 54.180.158.93 j9a209.p.ssafy.io;
	location / {
		return 301 $scheme://idog.store$request_uri;
	}
}

server {
	server_name idog.store www.idog.store;

	location /api {
		proxy_pass http://backend;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
	}

	location /blockchain {
		proxy_pass http://blockchain;
		proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;

	}

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/idog.store/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/idog.store/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = www.idog.store) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    if ($host = idog.store) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

	listen 80;
	server_name idog.store www.idog.store;
    return 404; # managed by Certbot
}
```

jenkins 설정

```bash
upstream jenkins {
	keepalive 32; # keepalive connections
	server 127.0.0.1:8000; # Jenkins의 IP와 Port 필요. 이 튜토리얼에선 9090 사용
}

# Required for Jenkins websocket agents
map $http_upgrade $connection_upgrade {
	default upgrade;
	'' close;
}

server { # Listen on port 80 for IPv4 requests
	server_name jenkins.idog.store; # 이 부분을 자신의 주소로 변경하여야 합니다

    # this is the jenkins web root directory
    # (mentioned in the output of "systemctl cat jenkins")
    root /var/run/jenkins/war/;
    access_log /var/log/nginx/jenkins.access.log;
    error_log /var/log/nginx/jenkins.error.log;

    # pass through headers from Jenkins that Nginx considers invalid
    ignore_invalid_headers off;

    location ~ "^/static/[0-9a-fA-F]{8}\/(.*)$" {
        # rewrite all static files into requests to the root
        # E.g /static/12345678/css/something.css will become /css/something.css
        rewrite "^/static/[0-9a-fA-F]{8}\/(.*)" /$1 last;
    }

    location /userContent {
        # have nginx handle all the static requests to userContent folder
        # note : This is the $JENKINS_HOME dir
        root /var/lib/jenkins/;
        if (!-f $request_filename){
            # this file does not exist, might be a directory or a /**view** url
            rewrite (.*) /$1 last;
            break;
        }
        sendfile on;
    }

    location / {
        sendfile off;
	proxy_pass http://jenkins;
        proxy_redirect default;
        proxy_http_version 1.1;

        # Required for Jenkins websocket agents
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_max_temp_file_size 0;
        #this is the maximum upload size
        client_max_body_size 10m;
        client_body_buffer_size 128k;
        proxy_connect_timeout 90;
        proxy_send_timeout 90;
        proxy_read_timeout 90;
        proxy_buffering off;
        proxy_request_buffering off; # Required for HTTP CLI commands
        proxy_set_header Connection ""; # Clear for keepalive
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/idog.store/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/idog.store/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = jenkins.idog.store) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

	server_name jenkins.idog.store;
    listen 80;
    return 404; # managed by Certbot
}
```

개인정보처리방침 설정

```bash
server {
    listen 80;
    server_name idog.store;  # 여기에 도메인을 지정합니다.

    location /policy {
        root /home/ubuntu/html;  # HTML 파일이 위치한 디렉토리 경로를 지정합니다.
        index privacy_policy.html;  # 기본 문서 이름을 지정합니다.
    }
}
```

sonarqube 설정

```bash
upstream sonarqube{
        keepalive 32;
        server 127.0.0.1:8888;
}

server {
        listen 80;
        server_name 54.180.158.93 j9a209.p.ssafy.io;
        location / {
                return 301 $scheme://;
        }
}

# the server directive is Nginx's virtual host directive
server {
  # port to listen on. Can also be set to an IP:PORT
  # sets the domain[s] that this vhost server requests for
  server_name sonarqube.idog.store j9a209.p.ssafy.io:8888;
  location / {
    proxy_pass http://sonarqube;
  }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/sonarqube.idog.store/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/sonarqube.idog.store/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = sonarqube.idog.store) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

  listen 80;
  server_name sonarqube.idog.store;
    return 404; # managed by Certbot
}
```

## 프로젝트 빌드 및 배포

### SpringBoot

[Dockerfile]

```docker
FROM openjdk:11-jdk
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

[SpringBoot Docker image Build]

```bash
cd **S09P22A209/back/ppobbi**
docker build -t dognfta209/idog-back .
docker push dognfta209/idog-back:$BUILD_NUMBER
```

[SpringBoot 실행]

```bash
docker pull dognfta209/idog-back:$BUILD_NUMBER
docker run --name idog-back -d -p 8080:8080 dognfta209/idog-back:$BUILD_NUMBER
```

### Express

[env]

```bash
RPC_URL=https://polygon-rpc.com/
SECRET_SALT=디지털 지갑 접근 비밀번호 SALT
NFT_STORAGE_KEY=NFT.Storage API key
BUCKET_NAME=ppobbi
ACCESS_KEY_ID=S3 ACCESS KEY
SECRET_ACCESS_KEY=S3 SECRET KEY
```

[Dockerfile]

```docker
FROM node:18-alpine

# package 내에 설정된 라이브러리들 현재 위치에 복사
COPY package*.json ./

RUN npm install

# 모든 파일들 현재 위치에 복사
COPY . .

CMD ["npm", "run", "dev"]
```

[Express Docker image Build]

```bash
cd **S09P22A209/express**
docker build -t dognfta209/idog-bc .
docker push dognfta209/idog-bc:$BUILD_NUMBER
```

[Express 실행]

```bash
docker pull dognfta209/idog-bc:$BUILD_NUMBER
docker run --name idog-bc -d -p 3000:3000 dognfta209/idog-bc:$BUILD_NUMBER
```

### Android

[env]

```bash
sentry_dsn=SENTRY Client ID
AWS_REGION=ap-northeast-2
AWS_BUCKET=ppobbi
AWS_ACCESS_KEY=S3 ACCESS KEY
AWS_SECRET_ACCESS_KEY=S3 SECRET KEY
ANDROID_CLIENT_ID=구글 소셜 로그인 Client ID
RPC_URL=https://polygon-rpc.com/
SECRET_SALT=디지털 지갑 접근 비밀번호 SALT
NFT_STORAGE_KEY=NFT.Storage API key
MINT_DOG_TOKEN_ADDRESS=0xdB983532a92837Ee0faF0e67854993a858f621d2 // 컨트랙트 주소
ADMIN_WALLET_PRIVATE_KEY=관리자 지갑 개인키 // 민팅 가스비 충당용
POLYGON_API_KEY=Polygon API key
```

[keystore 생성]

```bash
cd C:\Program Files\Java\jdkx.x.x_x\bin

# 관리자 계정으로 cmd 혹은 bash 실행
keytool -genkeypair -v -storetype PKCS12 -keystore "키스토어 이름".keystore -alias "키스토어 별칭" -keyalg RSA -keysize 2048 -validity 10000

```

[apk, aab 빌드]

```bash
cd **S09P22A209/front/android**

# apk 빌드
****./gradlew app:assembleRelease

# aab 빌드
./gradlew bundleRelease
```

## 환경 변수, 계정, 프로퍼티 파일 목록

### Spring

- application.yml
- application-release.yml
- applicaition-jwt.yml
- applicaition-appkey.yml
- application-oauth.yml
- application-mmlog.yml
- applicaition-redisrelease.yml

```yaml
spring:
  profiles:
    group:
      release:
        - oauth
        - jwt
        - redisrelease
        - appkey
        - mmlog
      develop:
        - oauth
        - jwt
        - redisdev
        - appkey
        - mmlog
    # release(prod) / develop(dev) 중에 선택
    active: release
```

```yaml
spring:
  config:
    activate:
      on-profile: "jwt"

jwt:
  secret: 시크릿키
  refresh-expired-in: 2_627_000_000
  access-expired-in: 1_800_000
```

```yaml
spring:
  config:
    activate:
      on-profile: "appkey"

appkey:
  polygon:
    value: 폴리곤 API키
```

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: 83063651083-fh2o1f6o59fna1pl74bb9kqr2fivjgf9.apps.googleusercontent.com
            client-secret: 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
            redirect-uri: http://localhost:8080/user/login/oauth2/code/google
            scope:
              - profile
              - email
```

```bash
server:
  port: 8080

spring:
  config:
    activate:
      on-profile: "release"

  initDb:
    enable: true

  datasource:
    url: jdbc:mariadb://j9a209.p.ssafy.io:3308/idog?characterEncoding=UTF-8&serverTimezone=KST
    username: 계정이름
    password: 비밀번호
    driver-class-name: org.mariadb.jdbc.Driver
  jpa:
    hibernate:
    properties:
      hibernate:
        show_sql: true
        format_sql: true
        default_batch_fetch_size: 100

logging.level:
  com.haru.ppobbi: debug
  org.hibernate.SQL: debug
  org.hibernate.type: trace #스프링 부트 2.x, hibernate5
# org.hibernate.orm.jdbc.bind: trace #스프링 부트 3.x, hibernate6
```

```yaml
spring:
  config:
    activate:
      on-profile: "mmlog"

notification:
  mattermost:
    enabled: true # 알람을 끄고 싶으면 false로 설정
    webhook-url: incoming webhook url
    fallback: hmm? # default message
    author-name: 이름
    author-icon: 아이콘
```

```yaml
spring:
  config:
    activate:
      on-profile: "redisrelease"

  redis:
    host: 서버IP
    port: 6379
    password: 비밀번호
    ttls:
      user-info: 3_600_000
      flower: 3_600_600
```
