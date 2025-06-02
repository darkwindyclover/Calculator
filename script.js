let n1 = 0;
let n2 = '';
let op = '';
let lastAction = '';

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

buttons.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        buttonClick(e.target.textContent);
    }
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
            n1 = n1*10+parseInt(btn);
        }
        else if ((lastAction == 'n2') || (lastAction == 'op'))
        {
            lastAction = 'n2';
            n2 = n2*10+parseInt(btn);
        }
        else if (lastAction == '=') {
            clear();
            lastAction = 'n1';
            n1 = n1*10+parseInt(btn);
        }
    }
    else if (btn == 'C') {
        clear();
    }
    render();
    console.log(`n1: ${n1}, n2: ${n2}, op: ${op}, lastAction: ${lastAction}`);
}


function clear() {
    n1 = 0;
    n2 = '';
    op = '';
    lastAction = '';
}

function render() {
    display.textContent = `${n1}${op}${n2}`;
}