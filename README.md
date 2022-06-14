## 퍼블리싱 산출물
- mobile : [https://stylelq.github.io/mobile/html/map/map_lq.html](https://stylelq.github.io/mobile/html/map/map_lq.html)   
- pc : [https://stylelq.github.io/pc/html/map/map_lq.html](https://stylelq.github.io/pc/html/map/map_lq.html)

## Tip
- Github page로 퍼블 산출물 배포하는데, Github page 자체가 배포하는데 로딩이 있어 넉넉하게 push하고 5~10분뒤에 확인하자.

***

## 목차
### 1. 가이드 요약
#### 1.1. 공통 유의사항
- 파일/폴더명   

|폴더명|내용|
|:-----:|:-----:|
|html|HTML 문서|
|css|스타일시트|
|fonts|폰트|
|images|이미지|
|js|자바스크립트|

- 클래스명 작성규칙
  - BEM 방법론 사용   
    ```html
      <!-- 예시 -->
      <div class="myLouis-level level-1"> <!-- Block(블록) -->
        <div class="myLouis-level__icon"></div>
        <div class="myLouis-level__more"> <!-- Element(요소) -->
          <a href="#" class="myLouis-level__more--userInfo">홍길동님</a> <!-- Modifier(수정자) -->
          <p class="myLouis-level__more--text">
            <span class="myLouis-level__name">PLATINUM</span> 등급입니다.
          </p>
          <a href="#membershipJoin" class="myLouis-level__more--membership js-popup-open">맴버쉽 혜택</a>
        </div>
      </div>  
      ```
- 웹접근성
  - 이미지 alt값 설정
  - 캐릭터셋 지정   
    ```html
     <meta charset=“utf-8” >
      ```
- 기본 문서형/문자셋
  - 문서형: HTML5
  - 문자셋/인코딩: UTF-8 
 
#### 1.2. pc/mobile 기본정보
- 문자셋(charset)
  - UTF-8
- XHTML 문법
  - 속성의 값은 큰따옴표("")로 묶는다
  - 종료태그는 반드시 선언한다
  - 모든 요소와 속성은 소문자로 작성한다
- 공통 css구성
  - common.css(common.scss에 공통 스타일을 import함)
  - common.scss를 구성하는 scss 폴더구조 및 폴더명
    |디렉토리|파일명|내용|
    |:-----:|:-----:|:-----:|
    |base|_font|웹폰트지원|
    |base|_mixins|mixins 통합 관리|
    |base|_reset|테마 리셋정보|
    |base|_rule|자주사용하는 클래스 등록|
    |base|_variables|변수 정보| 
    |layout|_footer|푸터 스타일 정의|
    |layout|_gnb|헤더 메뉴 스타일 정의|
    |layout|_header|헤더 레이아웃 스타일 정의|
    |layout|_layout|사이트 레이아웃 스타일 정의|
    |layout|_search|헤더 서치 스타일 정의| 
    |components|_cartFix|상품리스트, 상품상세 우측 하단에 노출되는 최신본제품 및 Top버튼 스타일 정의|
    |components|_cartFixButton|상품 상세페이지 하단 결제 버튼 스타일 정의|
    |components|_depthHead|각 페이지의 상단 2뎁스 lnb 요소 스타일 정의|
    |components|_form|폼(인풋, 테이블, 셀렉박스 등) 관련된 스타일 정의|
    |components|_paging|리스트, 포스트 페이징 스타일 정의|
    |components|_popup|모든 팝업관련 스타일 정의|
    |components|_productFixButton|상품 상세 하단 결제, 좋아요관련 픽시드버튼 스타일 정의|
    |components|_productListFilter|상품 리스트 상단 필터 레이아웃 스타일 정의|
- 파일명 네이밍 규칙
  - 알파벳 소문자, 숫자, 언더바(_)를 조합하여 생성함
- 레이아웃
  - PC
    - 1920px이 디폴트로, 1200px까지 처리 (브라우저 크롬 기준)
  - 모바일
    - 360px 기준으로 작업진행
    - 359px 이하부터 html 기본 폰트사이즈 14px로 정의
    - 태블릿버전 항상 체크
  
***

### 2. HTML 작업규칙   
#### 2.1. 문서형 선언
```html
    <!DOCTYPE html>
  ```
#### 2.2. 언어 지정
- 스크린 리더가 lang 속성을 통해 자동으로 음성을 변환함
```html
    <html lang="ko">
  ```
#### 2.3. <head>구조
- meta, title, link 순서로 요소를 선언
```html
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="description" content="">
      <meta name="format-detection" content="telephone=no, address=no, email=no">
      <meta property="og:type" content="website">
      <meta property="og:title" content="루이까또즈">
      <meta property="og:description" content="">
      <meta property="og:url" content="">
      <title>루이까또즈 StyleLQ</title>
      <!-- icon/favicon -->
      <link rel="shortcut icon" href="../../images/logo/favicon.ico" />
      <link rel="icon" type="image/png"  href="../../images/logo/favicon_32.png" sizes="32x32" />
      <link rel="icon" type="image/png" href="../../images/logo/favicon_192.png" sizes="192x192" />

      <!-- 공통 css -->
      <link rel="stylesheet" href="../../css/common.css">
    </head>
  ```
#### 2.4. HTML 코드 작성 규칙
- 표준 문법의 사용
  - DTD(문서 타입 정의)의 명세에 맞게 작성해야 함   
    * DTD를 제외한 모든 요소와 속성은 소문자로 작성한다.
    * 속성의 값은 큰따옴표("")로 묶는다.
    * 특수기호는 엔티티 코드(Entity Code)로 변환한다.
    * 종료 태그를 반드시 선언한다.
    
    유의해야 할 특수기호 Entity name
    |문자|엔티티 문자|
    |:-----:|:-----:|
    | |&nbsp;|
    |<|&lt;|
    |>|&gt;|
    |&|&amp;|
    |"|&quot;|

#### 2.5. 주석
- 코드의 가독성을 높이고 페이지별 HTML 구조를 쉽게 파악하기 위해 주석사용
```html
      <!-- 주문 상품정보-->
      <section class="payment-section">
        <h2 class="payment-section__title">주문 상품정보</h2>
        <div class="payment-section__cont">
          <% include ../_include/_orderProduct %>
        </div>
      </section>
      <!-- .주문 상품정보 -->

      <!-- 쿠폰/할인 정보-->
      <section class="payment-section">
        <h2 class="payment-section__title">쿠폰/할인 정보</h2>
        <div class="payment-section__cont">
          <% include ../_include/_couponInfo %>
        </div>
      </section>
      <!-- .쿠폰/할인 정보 -->
  ```

#### 2.6. 마크업 유의사항
- DTD 선언 앞에 주석 등이 내용이 없어야 함
- <p> 태그 안에는 p, div, ul 등 다른 블럭요소가 들어갈 수 없음
- 하나의 ID는 페이지에서 한번만 사용해야 함

***

### 3. CSS 작업규칙
#### 3.1. 공통 CSS

#### 3.2. 로컬 CSS

|디렉토리|파일명|내용|
|:-----:|:-----:|:-----:|
|center|_faq|faq 탭, 리스트 검색결과|
|center|_inquiry|1:1문의 레이아웃 및 입력폼|
|center|_main|고객센터 메인 및 공통 레이아웃|
|center|_membership|MEMBERSHIP(멤버쉽)페이지|
|center|_single|공지사항 상세페이지|
|center|_store_inquiry|대량구매/입점문의 페이지|
|center|_stores|STORE(스토어) 페이지|
|mypage|_address|배송지관리 리스트|
|mypage|_addressWrite|배송지입력 폼|
|mypage|_allim|재입고 알림 내역 페이지|
|mypage|_base|마이페이지 공통 레이아웃|
|mypage|_coupon|쿠폰페이지|
|mypage|_event|이벤트 참여현황페이지|
|mypage|_memberRemove|회원탈퇴페이지|
|mypage|_myInfo|회원정보 수정페이지 - 인증|
|mypage|_myInfoModify|회원정보 수정페이지 - 수정|
|mypage|_myInquiry|1:1문의 리스트페이지|
|mypage|_myLouis|마이페이지 메인|
|mypage|_orderList|주문배송조회 리스트|
|mypage|_password|비밀번호 변경페이지|
|mypage|_qna|상품 Q&A 페이지|
|mypage|_reserves|적립금페이지|
|mypage|_returnOrder|취소/반품|
|mypage|_review|상품 리뷰|
|mypage|_wishList|wishList(위시리스트)|
|pages|cart|장바구니|
|pages|center||
|pages|collection|콜렉션|
|pages|detail|상품상세페이지|
|pages|gift|기프트페이지|
|pages|join|회원가입 및 로그인페이지|
|pages|main|메인페이지|
|pages|mypage|마이페이지 디렉토리 안에 있는 파일들 import|
|pages|payment|주문결제페이지|
|pages|platform|플랫폼L 페이지|
|pages|product|상품 리스트영역|
|pages|project|프로젝트 페이지|
|pages|project_collaboration|콜라보레이션|
|pages|promotion|프로모션|

#### 3.3. 폰트 스타일
- 글자의 크기와 폰트
- 웹폰트 사용
- 글자의 색상
- 상품 이미지 삽입
        
#### 3.4. CSS 코드 작성 규칙
- 기본규칙
  - 모든 속성은 영문 소문자로 작성한다.
  - 작은 따옴표('') 사용범위
    - 폰트의 선언, 배경 url, filter, content에 사용한다.
  - 세미콜론
    - 모든 속성에 세미콜론을 사용한다.

 #### 3.5. CSS animation

***
### 4. 라이브러리
#### 4.1. Javascript 라이브러리

|파일명|내용|
|:-----:|:-----:|
|/js/libs/animation.gsap.js|애니메이션 라이브러리(프로젝트페이지)|
|/js/libs/jquery.panzoom.js|객체 확대축소 이동 라이브러리(상품상세페이지)|
|/js/libs/jquery-3.6.0.min.js|제이쿼리 사용을 위한 라이브러리|
|/js/libs/ScrollMagic.min.js|스크롤애니메이션 라이브러리(프로젝트 및 프로모션)|
|/js/libs/swiper-4.5.0.min.js|제이쿼리 사용을 위한 라이브러리|
|/js/libs/TweenMax.min.js|GSAP의 기본적인 애니메이션 라이브러리|
  
***
### 5. 공통 레이아웃 구조
#### 5.1. 페이지
- 상품 리스트 구조
```html
      <!-- product post -->
      <div class="product-post product-post--post">
        <ul class="product-post__list">
          <li class="product-post__item">
            <!-- item -->
            <div class="product-item">
              <a href="" class="product-item__link">
              <div class="product-item__state">SOLD OUT</div>
              <div class="product-item__thumb">
                <img class="product-item__img" src="../../images/dummy/product_img3.png" alt="" />
                <img class="product-item__img" src="../../images/dummy/product_img3_3.png" alt="" />
              </div>
              <div class="product-item__cont">
                <div class="product-item__title">루이까또즈 L-Quilting Mini(엘퀼팅 미니) 여성크로스백 HP3QT06OR</div>
                <div class="product-item__price">
                  <span class="product-item__price--sale">328,000원</span>
                  <span class="product-item__price--current">289,290원</span>
                </div>
              </div>
              </a>
            </div>
            <!-- .item -->
          </li>
          <li class="product-post__item">
            <!-- item -->
            <div class="product-item">
              <a href="" class="product-item__link">
              <div class="product-item__state">SOLD OUT</div>
              <div class="product-item__thumb">
                <img class="product-item__img" src="../../images/dummy/product_img3.png" alt="" />
                <img class="product-item__img" src="../../images/dummy/product_img3_3.png" alt="" />
              </div>
              <div class="product-item__cont">
                <div class="product-item__title">루이까또즈 L-Quilting Mini(엘퀼팅 미니) 여성크로스백 HP3QT06OR</div>
                <div class="product-item__price">
                  <span class="product-item__price--sale">328,000원</span>
                  <span class="product-item__price--current">289,290원</span>
                </div>
              </div>
              </a>
            </div>
            <!-- .item -->
          </li>
        </ul>
      </div>
      <!-- .product post -->
  ```
- 페이징 구조

```html
    <!-- paging -->
    <div class="paging">
        <ul class="paging__list">
            <li class="paging__item paging__item--prev">
              <a class="paging__link" href="#;">
                <span class="sr-only">prev</span>
              </a>
            </li>
            <li class="paging__item is-current">
              <span class="paging__link">1</span>
            </li>e
            <li class="paging__item">
              <a class="paging__link" href="#;">2</a>
            </li>
            <li class="paging__item">
              <a class="paging__link" href="#;">3</a>
            </li>
            <li class="paging__item">
              <a class="paging__link" href="#;">4</a>
            </li>
            <li class="paging__item">
              <a class="paging__link" href="#;">5</a>
            </li>
            <li class="paging__item paging__item--next">
              <a class="paging__link" href="#;">
                <span class="sr-only">next</span>
              </a>
          </li>
        </ul>
    </div>
    <!-- .paging -->
  ```

#### 5.2. 레이어팝업
