class Calculator{

    constructor(){
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');
        this.reset = 0;
    }

    //método soma
    sum(n1, n2){
        return n1 + n2;
    }

    subtraction(n1, n2){
        return n1 - n2;
    }

    divide(n1, n2) {
        try {
            if (n2 === 0){
                throw new Error('Divisão por zero');
            }
            return n1 / n2;
        } catch (error) {
            return `Erro: ${error.message}`;
        }
    }

    multiply(n1, n2){
        return n1 * n2;
    }
    
}


//criando o objeto
const calc = new Calculator;

//start nos btns
let buttons = document.querySelectorAll('.btn');
console.log('teste');

const resultado= calc.sum(1,2);
console.log(resultado);

//Chamando o método subitração
let teste = calc.subtraction(5,4);
console.log(teste);

//Chamando o método divisão
teste = calc.divide(10,5);
console.log(teste);

//Chamando o método multiplicar
teste = calc.multiply(5,4);
console.log(teste);

for (let i=0; buttons.length > i; i++){
    buttons [i].addEventListener('click,calc.btnPress');
}
