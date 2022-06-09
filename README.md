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
#### 2.3. <head> 구조
#### 2.4. button 요소의 사용 범위
#### 2.5. 요소의 기본 속성 지정 순서
#### 2.6. 주석
#### 2.7. 마크업 유의사항

***
### 3. CSS 작업규칙
#### 3.1. 파일 위치
#### 3.2. 공통 CSS
#### 3.3. 폰트 스타일

***
### 4. 라이브러리
#### 4.1. Javascript 라이브러리
  
***
### 5. 공통 레이아웃 구조
#### 5.1. 페이지
#### 5.2. 레이어팝업
