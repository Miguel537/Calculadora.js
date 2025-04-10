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

    //Começar aqui
    clearValues(){
        this.upperValue.textContent = '0';
        this.resultValue.textContent = '0';
        this.reset = false; 
    }

    resolve(expression){
        //Substitui 'x' por '*' e quebra a expressão em tokens (números e operadores)
        //números decimais e operadores (+, -, *, /).
        const tokens = expression.replace(/x/g, '').match(/(\d+\.?\d|\+|\-|\*|\/)/g);
        alert('teste');
        if (!tokens) {  // Verifica se há algo para calcular
            return 'Erro';
        }
        let stack = [];

        //Primeiro passo: aplicar multiplicação (*) e divisão (/)
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
    
            if (token === '*' || token === '/') {
                const n1 = parseFloat(stack.pop());      // remove o último número da pilha
                const n2 = parseFloat(tokens[++i]);      // pega o próximo número
                let result = token === '*' ? this.multiplication(n1, n2) : this.divide(n1, n2);
                if (typeof result === 'string') return result; // tratamento de erro (divisão por zero)
                stack.push(result); // insere o resultado de volta na pilha
            } else {
                stack.push(token); // empilha números e operadores '+' ou '-'
         }
       }

       //Segundo passo: aplicar soma (+) e subtração (-)
       let result = parseFloat(stack[0]); //Começa pelo primeiro número
       for (let i = 1; i < stack.length; i += 2){
        const operador = stack[i];
        const num = parseFloat(stack[i + 1]);
        if (operador === `+`) result = this.sum(result, num);
        if (operador === `-`) result = this.subtraction(result, num);
       }
       alert(result);
       return result;
    }

    btnPress = (event) => {
        const input = event.target.textContent; 
        let currentExpression = this.upperValue.textContent;

        //Limpa
        if (input === 'AC') {
            this.clearValues(); //Limpa o valor da calculadora
            return;
        }

        if (input === '='){
            const result = this.resolve(currentExpression); //Resolvee a conta
            this.resultValue.textContent = result; //Mostra o resultado
            this.upperValue.textContent = currentExpression;
            this.reset = true; //Ativa a flag para reiniciar em 0
            return;
        }

        //se o botão clicado for um numero inteiro e a calculadora estiver em modo de reiniciar
        if (this.reset && /^\d+$/.test(input)){
            currentExpression = '0';
            this.reset = false;
        }

        //substitui o zero inicial se for numero
        if (currentExpression === '0' && /^\d+$/.test(input)){
            currentExpression = input;
        }else{
            currentExpression += input;
        }

        this.upperValue.textContent = currentExpression;
    }
    
}


//criando o objeto
const calc = new Calculator();

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
    buttons[i].addEventListener('click',calc.btnPress);
}
