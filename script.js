let n1 = 0;
let n2 = '';
let op = '';
let lastAction = '';
let decFlag = false;
let decimalDepth = 0;

let buttons = document.querySelector('.buttons');
let display = document.querySelector('.display');

function add(x, y) {
    return x+y;
}

function sub(x, y) {
    return x-y;
}

function div(x, y) {
    return x/y;
}

function mult(x, y) {
    return x*y;
}

function operate(x, y, op) {
    switch (op) {
        case '+': return add(x, y);
        case '-': return sub(x, y);
        case '/': return div(x, y);
        case '*': return mult(x, y);
        default: return undefined;
    }
}

function roundToDecimal(number, decimalPos) {
    const mult = 10**decimalDepth;
    return Math.floor(number*mult)/mult;
}

buttons.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        buttonClick(e.target.textContent);
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        btn = '=';
    }
    else if (e.key == 'c') {
        btn = 'C';
    }
    else {
        btn = e.key;
    }
    console.log(e.key, btn);
    buttonClick(btn);
});

function buttonClick(btn) {
    if (['+', '-', '*', '/'].includes(btn)) {
        if (lastAction == 'op')
        {
            op = btn;
            lastAction = 'op';
        }
        else if (lastAction == 'n1') {
            op = btn;
            lastAction = 'op';
        }
        else if (lastAction == 'n2') {
            n1 = operate(n1, n2, op);
            lastAction = 'op'; //here
            n2 = '';
            op = btn;
        }
        else if (lastAction == '=') {
            op = btn;
            lastAction = 'op';
        }
        decFlag = false;
        decimalDepth = 0;
    }
    else if (btn == '=') {
        if (lastAction == 'n2') {
            n1 = operate(n1, n2, op);
            lastAction = '=';
            n2 = '';
            op = '';
        }
    }
    else if (btn > -1 && btn < 10) {
        if ((lastAction == 'n1') || (lastAction == ''))
        {
            lastAction = 'n1';
            if (decFlag == true) {
                decimalDepth++;
                n1 = n1+parseInt(btn)/(10**decimalDepth);                
            }
            else {     
                n1 = n1*10+parseInt(btn);
            }          
        }
        else if ((lastAction == 'n2') || (lastAction == 'op'))
        {
            lastAction = 'n2';
            if (decFlag == true) {
                decimalDepth++;
                n2 = n2+parseInt(btn)/(10**decimalDepth);              
            }
            else {
                n2 = n2*10+parseInt(btn);
            }
        }
        else if (lastAction == '=') {
            clear();
            lastAction = 'n1';
            n1 = n1*10+parseInt(btn);
        }
    }
    else if (btn == 'Backspace') {
        if (lastAction == 'n1') {
            if (decimalDepth != 0) {
                decimalDepth--;
                n1 = roundToDecimal(n1, decimalDepth);
                console.log(n1);              
            }
            else {
                n1 = Math.floor(n1/10);
            }      
            if (n1 === 0) {
                decFlag=false;
            }     
        }
        else if (lastAction == 'n2') {
            if (decFlag == true) {
                decimalDepth--;
                n2 = roundToDecimal(n2, decimalDepth);
            }
            else {
                n2 = Math.floor(n2/10);
            }       
            if (n2 === 0) {
                decFlag=false;
            }    
        }
    }
    else if (btn == '.') {
        if ((lastAction == 'n1' || lastAction == 'n2') && (decFlag == false)) {
            decFlag = true;
        }     
    }
    else if (btn == 'C') {
        clear();
    }
    render();
    console.log(`n1: ${n1}, n2: ${n2}, op: ${op}, lastAction: ${lastAction}, depth: ${decimalDepth}, decFlag: ${decFlag}`);
}


function clear() {
    n1 = 0;
    n2 = '';
    op = '';
    lastAction = '';
    decimalDepth = 0;
    decFlag = false;
}

function render() {
    display.textContent = `${n1}${op}${n2}`;
}