let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");
const buttonsArray = Array.from(buttons);
let currentInput = '';

//logic to update the display
buttonsArray.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.textContent;
        if ( value === 'AC'){
            currentInput = '';
            display.value = currentInput;
        }

         else if ( value === '%'){
            currentInput += '/100';
            display.value = currentInput;
        }
        else if ( e.target.id === 'backspace'){
            currentInput = display.value;
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        }
         else if ( e.target.id === 'cross'){
            currentInput += '*';
            display.value = currentInput;
        }
        else if ( e.target.id === 'division'){
            currentInput += '/';
            display.value = currentInput;
        }
        else if ( e.target.id === 'equal-btn'){
            currentInput = eval(display.value);
            display.value = currentInput;
        }
        else{
            currentInput += value;
            display.value = currentInput;
        }
    })
})
