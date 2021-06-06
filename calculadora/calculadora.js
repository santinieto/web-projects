// CALCULADORA
// En este ejemplo se usan expresiones regulares
//
// Una expresion regular se puede ver como una formula para buscar dentro de texto ciertas coincidencias
//
//

// Cargamos los botones en el script de JavaScript
const button_0      = document.querySelector('#button_0');      // Boton numero 0
const button_1      = document.querySelector('#button_1');      // Boton numero 1
const button_2      = document.querySelector('#button_2');      // Boton numero 2
const button_3      = document.querySelector('#button_3');      // Boton numero 3
const button_4      = document.querySelector('#button_4');      // Boton numero 4
const button_5      = document.querySelector('#button_5');      // Boton numero 5
const button_6      = document.querySelector('#button_6');      // Boton numero 6
const button_7      = document.querySelector('#button_7');      // Boton numero 7
const button_8      = document.querySelector('#button_8');      // Boton numero 8
const button_9      = document.querySelector('#button_9');      // Boton numero 9
const button_a      = document.querySelector('#button_a');      // Boton de suma
const button_m      = document.querySelector('#button_m');      // Boton de resta
const button_x      = document.querySelector('#button_x');      // Boton de multiplicacion
const button_d      = document.querySelector('#button_d');      // Boton de division
const button_p      = document.querySelector('#button_p');      // Boton de punto
const button_ac     = document.querySelector('#button_ac');     // Boton de borrado
const button_del    = document.querySelector('#button_del');    // Boton de borrado unitario
const button_ans    = document.querySelector('#button_ans');    // Boton de ultima respuesta
const button_eq     = document.querySelector('#button_eq');     // Boton de obtener resultado
const button_exp    = document.querySelector('#button_exp');    // Boton de exponenciacion

// Le asignamos la funcion a cada boton
button_0.addEventListener("click", (e) =>   { calculadora.update_display("0");    } );
button_1.addEventListener("click", (e) =>   { calculadora.update_display("1");    } );
button_2.addEventListener("click", (e) =>   { calculadora.update_display("2");    } );
button_3.addEventListener("click", (e) =>   { calculadora.update_display("3");    } );
button_4.addEventListener("click", (e) =>   { calculadora.update_display("4");    } );
button_5.addEventListener("click", (e) =>   { calculadora.update_display("5");    } );
button_6.addEventListener("click", (e) =>   { calculadora.update_display("6");    } );
button_7.addEventListener("click", (e) =>   { calculadora.update_display("7");    } );
button_8.addEventListener("click", (e) =>   { calculadora.update_display("8");    } );
button_9.addEventListener("click", (e) =>   { calculadora.update_display("9");    } );
button_a.addEventListener("click", (e) =>   { calculadora.update_display("+");    } );
button_m.addEventListener("click", (e) =>   { calculadora.update_display("-");    } );
button_x.addEventListener("click", (e) =>   { calculadora.update_display("*");    } );
button_d.addEventListener("click", (e) =>   { calculadora.update_display("/");    } );
button_p.addEventListener("click", (e) =>   { calculadora.update_display(".");    } );

// Botones especiales
button_ac.addEventListener("click", (e) =>  { calculadora.clear_all();            } );   
button_ans.addEventListener("click", (e) => { calculadora.update_display("Ans");  } );
button_exp.addEventListener("click",(e) =>  { calculadora.update_display("x10^"); } );   
button_eq.addEventListener("click", (e) =>  { calculadora.get_result();           } );  
button_del.addEventListener("click",(e) =>  { calculadora.del_character();        } );   

// Recibo los numeros por comando
window.addEventListener("keydown", (e) => {
    // Leo la tecla
    const key = e.key;

    // Si es un numero
    if(key >= 0 && key <= 9){
        calculadora.update_display(key);
    }

    // Caracteres especiales
    const especialKeys = ["+","-","*","/","."];
    if(especialKeys.includes(key)){
        calculadora.update_display(key);
    }

    if(key == "e"){
        calculadora.update_display("x10^");
    }

    // Si es un Enter
    if(key == "Enter"){
        calculadora.get_result();
    }

    // Si tengo que borrar un caracter
    if(key == "Backspace"){
        calculadora.del_character();
    }
    
}, true);

// Creamos la clase calculadora
class Calculadora {
    constructor(){
        this.myEq       = " ";
        this.res        = 0;
        this.ans        = 0;
        this.display_up = document.querySelector("#ecuacion");
        this.display_dw = document.querySelector("#resultado");
    }

    update_display = (character) => {
        this.myEq                  += character;
        this.display_up.textContent = this.myEq;
    };

    get_result = () => {
        let eq                      = this.myEq;
        eq                          = eq.replace("Ans",  this.ans);
        eq                          = eq.replace("x10^", "*10**");

        let valid_string = true;

        // Uso las expresiones regulares para encontrar errores
        let r;

        // Checkeo que el primer caracter sea un numero, un + o un menos
        r = /^([ \d\-\+]?)/gm;
        valid_string = r.test(eq);        

        console.log(eq)
        console.log(valid_string)

        if(valid_string == true){
            this.res                    = eval( eq );
            this.display_dw.textContent = this.res;
            this.ans                    = this.res;
            this.myEq                   = "";
        }
        else{
            this.display_up.textContent = "Syntax Error!";
            this.myEq                   = "0";
        }
    };

    del_character = () => {
        let eq                      = this.display_up.textContent;
        let new_eq;

        // Reemplazo Strings especiales
        if(eq.endsWith("Ans") == true){
            new_eq                  = eq.slice(0,-3);
        }
        else if(eq.endsWith("x10^") == true){
            new_eq                  = eq.slice(0,-4);
        }
        else{
            new_eq                  = eq.slice(0,-1);
        }

        this.display_up.textContent = new_eq;
        this.myEq                   = new_eq;
    }

    clear_all = () =>{
        this.myEq                   = "";
        this.display_up.textContent = this.myEq;
        this.display_dw.textContent = "0";
    }

}

const calculadora = new Calculadora();
calculadora.get_result();