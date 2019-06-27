let arr = [];


function isOperator(op) {
    if (op == '+' || op == '-' || op == '=' || op == '*' || op == "/") {
        return true;
    }
    return false;
}

function formatExp(data) {

    for (let x in data) {
        if (typeof data[x] == 'object') {
            formatExp(data[x])
        } else {
            if (data[x] == 'equal') {
                arr.push('=')
            } else if (data[x] == 'add') {
                arr.push('+')
            } else if (data[x] == 'subtract') {
                arr.push('-')
            } else if (data[x] == 'multiply') {
                arr.push('*')
            } else if (data[x] == 'divide') {
                arr.push('/')
            } else {
                arr.push(data[x])
            }
        }

    }

    return arr;

}

function preFixToPostFix(arr) {
    return arr.reverse();
}

function postFixtoinfix(arr) {
    let inarr = [];
    for (let i = 0; i < arr.length; i++) {
        if (isOperator(arr[i])) {
            if (inarr.length >= 1) {
                let last = inarr.pop();
                let secondLast = inarr.pop();
                let combine;
                if (i >= arr.length - 2) {
                    combine = last + " " + arr[i] + " " + secondLast;
                } else {
                    combine = "( " + last + " " + arr[i] + " " + secondLast + " )";
                }
                inarr.push(combine);
            }
        } else {
            inarr.push(arr[i])
        }
    }
    return inarr.toString();
}

function removeEmpty(a) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] == '') {
            a.splice(i, 1);
        }
    }
    return a;
}
function simplify(rhs, lhs) {
    let s = [];
    let exp = lhs.split(" ");
    console.log(exp);

    exp = removeEmpty(exp).join(',');
    console.log(exp);

    exp = exp.replace(/[()]/g,'');
    exp = exp.replace(/[x]/g,'');
    console.log(exp);
    exp = exp.split(',')

    exp = removeEmpty(exp);
    exp = removeEmpty(exp);
    console.log(exp);

    if(exp.length>3){
        for(var i=1 ; i<exp.length;i++ ){
            if(isOperator(exp[i]) && isOperator(exp[i+1])){
                    s.push(negateOperand(exp[i])+""+ exp[i-1]+")" + negateOperand(exp[i+1]))
                    i++;
            }else if(isOperator(exp[i])){
                    s.push(negateOperand(exp[i]) + exp[i-1]);
            }else{
                s.push(exp[i]);
            }
        }
        return "("+rhs+s.join('');
           

    }
}



function negateOperand(op){
    switch(op){
        case '+': return '-';
        case '-': return '+';
        case '*': return '/';
        case '/': return '*';
    }
}

var data = {
    "op": "equal",
    "lhs": {
        "op": "add",
        "lhs": 1,
        "rhs": {
            "op": "multiply",
            "lhs": "x",
            "rhs": 10
        }
    },
    "rhs": 21
}

const prefixFormat = formatExp(data)
console.log(prefixFormat);
const postFixFormat = preFixToPostFix(prefixFormat)
console.log(postFixFormat);
const infixFormat = postFixtoinfix(postFixFormat)
console.log(infixFormat);
const lhs = infixFormat.split("=")[0];
const rhs = infixFormat.split("=")[1]
const simplified =simplify(rhs, lhs);
console.log('x =' + simplified);
console.log('x =' + eval(simplified))
