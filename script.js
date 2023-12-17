let firstOperand ="";
let secondOperand="";
let operator = null;
let shouldResetDisplay = false;

const display = document.getElementById("displayScreen");
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
const equalBtn =  document.getElementById("equalBtn");
const clearBtn = document.getElementById("clearBtn");
const allClearBtn = document.getElementById("allClearBtn");
const decimalBtn = document.getElementById("decimalBtn");

window.addEventListener('keydown',keyBoardInput);
operators.forEach((operator)=>{operator.addEventListener('click',()=>setOperator(operator.firstElementChild.textContent))});
numbers.forEach((number) => {number.addEventListener('click',()=>appendNumber(number.firstElementChild.textContent))});
equalBtn.addEventListener('click',evaluate);
decimalBtn.addEventListener('click',addDecimal);
allClearBtn.addEventListener('click',clearAll);
clearBtn.addEventListener('click',clearDigit);

function appendNumber(number){
    if(displayScreen.textContent === "0"||shouldResetDisplay==true){
        resetDisplay();
    }
    display.textContent += number;
    console.log("reset called from append number")
    shouldResetDisplay = false;
}   

function setOperator(symbol){
    if(operator!==null) evaluate();
    firstOperand = display.textContent;
    operator = symbol;
    shouldResetDisplay = true;
}

function addDecimal(){
    if(!display.textContent.match(/^\d*\.\d*$/)){
        display.textContent +="."
    }
}

function evaluate(){
    if((operator === null) || shouldResetDisplay) return;
    secondOperand = display.textContent;
    let result = operate(firstOperand,secondOperand,operator);
    display.textContent = result;
    operator = null;
    console.log(result);
}

function resetDisplay(){
    display.textContent = "";
    console.log("reset called!");
}

function clearAll(){
    firstOperand ="";
    secondOperand="";
    operator = null;
    shouldResetDisplay = false;
    display.textContent ="0";
}

function clearDigit(){
    display.textContent = display.textContent.toString().slice(0,-1);
}

function operate(a,b,operator){

    a=Number(a);
    b=Number(b);

    if(operator === "+"){
       return a+b;
    }   
    else if(operator === "−"){
        return a-b;
    }
    else if(operator === "×"){
       return a*b;
    }
    else if(operator === "÷"){
        if(b==0){
            return "Error";
        }
        else{
            return a/b;
        }
    }
    else if(operator === "mod"){
        return a%b;
    }
}

function keyBoardInput(e){
    if(e.key>=0 && e.key<=9) appendNumber(e.key);
    if(e.key === "Escape") clearAll();
    if(e.key === "Backspace") clearDigit();
    if(e.key === "Enter") evaluate();
    if(e.key === ".") addDecimal();
    if(e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/" || e.key === "%") setOperator(convertSymbols(e.key))
}

function convertSymbols(e){
    if (e ==="-") return "−";
    if (e ==="+") return "+";
    if (e ==="/") return "÷";
    if (e ==="*") return "×";
    if (e ==="%") return "mod";
}
