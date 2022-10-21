//연산자를 저장할 배열(전역변수)
let Listoperation=[];
//연산자 종류를 저장할 배열(상수)
const operationList=["+","-","×","÷"];

//숫자를 입력할 때 동작하는 함수
function inputNumber(number){
  let display=document.getElementById("display");
  //식이 들어가는 칸에 number문자열 추가
  display.innerHTML+=number;
}

//clear를 입력했을때 동작하는 함수 
function inputClear(){
  let history=document.getElementById("history");
  let display=document.getElementById("display");
  //history칸과 display칸 모두 빈칸으로 만들기
  history.innerHTML="";
  display.innerHTML="";
  //연산자array 도 빈 array로 초기화
  Listoperation=[];
}

//연산자를 입력했을때 동작하는 함수
function inputoperation(operator){    
  let display=document.getElementById("display");
  //빈칸일때는 -를 제외한 연산자를 입력할 수 없음
  if(display.innerHTML.trim()=="" && operator!="-"){
      console.log("아무것도 없는곳에 연산자를 입력할 수 없습니다.");
  }
  //연산자를 입력한 뒤에 혹은 .의 뒤에 바로 연산자를 입력할 수 없음
  else if(operationList.includes(display.innerHTML.charAt(display.innerHTML.length-1))||display.innerHTML.charAt(display.innerHTML.length-1)=="."){
      console.log("연산자를 이어서 입력할 수 없습니다.");
  }
  //그 외의 경우 display의 내용으로 입력 됨
  else{
      //맨처음 입력 될 -부호는 연산자array에 포함하지 않기위해 display가 빈칸이 아닐때만 연산자array에 push
      if(display.innerHTML.trim()!=""){
          Listoperation
        .push(operator);
      }
      display.innerHTML+=operator;
  }
}

//.을 입력했을때 동작하는 함수
function inputDot(){
  let display=document.getElementById("display");

  //display의 내용을 +,-,×,÷로 split
  let numberList=display.innerHTML.split(/\+|\-|\×|\÷/);

  //빈칸에 .을 입력할 수 없음
  if(display.innerHTML.trim()==""){
    console.log("아무것도 없는곳에 .을 입력할 수 없습니다.");
   }
  //연산자뒤에 .을 입력할 수 없음
  else if(operationList.includes(display.innerHTML.charAt(display.innerHTML.length-1))){
      console.log("연산자의 뒤에 .을 입력할 수 없습니다.");
  } 

  //한 숫자에 .을 두 번이상 입력할 수 없음
  else if(numberList[numberList.length-1].includes(".")){
    console.log("한 숫자에 .을 두 개 쓸 수 없습니다.")
  }
  //그 외에는 display의 내용으로 입력됨
  else {
    display.innerHTML+="."
  }
}

//backspace를 입력했을때 동작하는 함수
function inputBackspace(){
  let display=document.getElementById("display");
  //display의 내용을 display의 내용에서 맨끝요소 하나를 뺀 내용으로 바꿈
  display.innerHTML=display.innerHTML.substring(0,display.innerHTML.length-1);
}


//덧셈함수
function plus(num1,num2){
  return num1+num2;
}

//뺄셈함수
function minus(num1,num2){
  return num1-num2;
}

//곱셈함수
function multiply(num1,num2){
  return num1*num2;
}

//나눗셈함수
function divide(num1,num2){
  //num2가 0이면 0으로 나눌 수 없음
  if(num2!=0){
      return num1/num2;
  }
}

//곱셈 나눗셈을 먼저 계산하기 위해 작동하는 함수
function calcMulDiv(numbers,operations){
  //곱셈 연산자나 나눗셈 연산자의 인덱스를 저장할 변수
  let location;
  //무한반복
  while(true){
      let result=0;
      //곱셈의 위치를 찾음
      location = operations.indexOf("×");
      //곱셈이 없다면 나눗셈의 위치를 찾음
      if(location==-1){
          location = operations.indexOf("÷");
      }
      //곱셈과 나눗셈이 둘다 없다면 탈출
      if(location==-1){
          break;
      }
      //찾은게 곱셈이면
      else if(operations[location]=="×"){
          //곱셈연산자 앞뒤의 수를 곱하고
          result=multiply(numbers[location],numbers[location+1]);
          //계산한 두 개의 수를 없애고 그 자리를 result로 대체함
          numbers.splice(location,2,result);
          //연산자array에서 계산한 연산자를 제거
          operations.splice(location,1);
      //찾은게 나눗셈이면
      }else if(operations[location]=="÷"){
          //나눗셈연산자 앞뒤의 수를 나누고
          result=divide(numbers[location],numbers[location+1]);
          //계산한 두 개의 수를 없애고 그 자리를 result로 대체함
          numbers.splice(location,2,result);
          //연산자array에서 계산한 연산자를 제거
          operations.splice(location,1);            
      }
  }
}

//남은 덧셈뺄셈을 계산하기 위한 함수
function calcPlusMinus(numbers,operations){
  //무한반복
  while(true){
      //숫자가 하나만남으면 탈출
      if(numbers.length==1){
          break;
      }

      let result=0;
      //맨앞의 연산자가 덧셈이면
      if(operations[0]=="+"){
          //연산자 앞뒤의 두 숫자를 더하고
          result=plus(numbers[0],numbers[1]);
          //계산한 두 개의 수를 없애고 그 자리를 result로 대체함
          numbers.splice(0,2,result);
          //연산자 array에서 맨앞의(계산한) 연산자를 제거
          operations.splice(0,1);
      }
      //맨앞의 연산자가 뺄셈이면
      else if(operations[0]=="-"){
          //연산자 앞뒤의 두 숫자를 빼고
          result=minus(numbers[0],numbers[1]);
          //계산한 두 개의 수를 없애고 그 자리를 result로 대체함
          numbers.splice(0,2,result);
          //연산자 array에서 맨앞의(계산한) 연산자를 제거
          operations.splice(0,1);            
      }
  } 
}

// =을 입력하면 작동하는 함수
function inputEqual(){
  let display=document.getElementById("display");
  let history=document.getElementById("history");

  //display의 내용을 따로저장
  let displayString=display.innerHTML;
  // 식의 칸 맨 뒤에 연산자가 들어있거나 .이 들어있으면 생략
  if(operationList.includes(display.innerHTML.charAt(display.innerHTML.length-1)||display.innerHTML.charAt(display.innerHTML.length-1)==".")){
      displayString=displayString.substring(0,displayString.length-1);
  }

  //displayString의 내용을 +,-,×,÷로 split
  let numberList=displayString.split(/\+|\-|\×|\÷/);
  // 숫자array의 0번째 요소가 빈칸이란 말은 내용 첫글자가 -였다는 말이므로
  if(numberList[0]==""){
      //맨 앞의 빈칸을 지움
      numberList.splice(0,1);
      //맨 앞 숫자에 -를 붙혀 음수로 만듬
      numberList[0]="-"+numberList[0];
  }
  //숫자 array내의 모든 숫자를 float형태로 바꿈
  numberList=numberList.map(element => {return parseFloat(element)});

  //0으로 나눗셈이 있을 때 막기위한 플래그 초기화
  let zeroDivisionFlag=false;
  for(let i=0; i<Listoperation.length; i++){
      //연산자가 /이고 와 연산자 뒤의 숫자가 0인게 발견되면 플래그를 활성화
      if(Listoperation[i]=="÷" && numberList[i+1]==0){
        zeroDivisionFlag=true;
      }
  }
  //플래그가 활성화된 상태면
  if(zeroDivisionFlag){
      //경고 출력
      console.log("0으로 나누는 식이 있습니다.");
  }
  //아무것도 입력안하고 버튼을 누른상태면
  else if (isNaN(numberList[0])){
      //경고 출력
      console.log("빈 칸 입니다.");
  }
  //정상적인 상태면
  else{        
      //히스토리에 넣을 내용을 초기화
      let historyString="";
      for(let i=0; i<Listoperation.length; i++){
          //숫자 리스트와 연산자 리스트의 값들을 교차로 입력
          historyString+=String(numberList[i]);
          historyString+=Listoperation[i];
      }
      //마지막 숫자를 입력
      historyString+=String(numberList[numberList.length-1]);
      //history의 내용으로 historyString을 입력
      history.innerHTML=historyString;
      
      //곱셈 나눗셈 먼저 계산
      calcMulDiv(numberList,Listoperation);
      //덧셈 뺄셈 계산
      calcPlusMinus(numberList,Listoperation);
      //display의 값을 결과값으로 변경
      display.innerHTML=numberList[0];
      //연산자array초기화
      Listoperation=[];
  }
}

//모든 버튼에서 버튼 클릭시 발생할 이벤트
function clickEvent(){
  //버튼의 클래스명에 따라 다르게 실행
  switch(this.className){
      //number클래스면 inputNumber를 실행
      case "number":
          inputNumber(this.innerHTML);
          break;
      //operation클래스면 inputoperation를 실행
      case "operator":
          inputoperation(this.innerHTML);
          break;
      //clear클래스면 inputClear를 실행
      case "clear":
          inputClear();
          break;
      //equal클래스면 inputEqual를 실행
      case "equal":
          inputEqual();
          break;
      //dot클래스면 inputDot를 실행
      case "dot":
          inputDot();
          break;
      //backspace클래스면 inputBackspace를 실행
      case "backspace":
        inputBackspace();
        break;
  }
}

//기본적인 이벤트를 세팅하는 함수
function setEvents(){
  //버튼 요소를 모두 불러옴
  let elementList=document.querySelectorAll("button")

  //모든 버튼에 onclick 이벤트로 clickEvent를 할당
  for(let i=0; i<elementList.length; i++){
      elementList[i].addEventListener("click",clickEvent);
  }
}

//각 요소에 자동으로 이벤트를 세팅
setEvents();