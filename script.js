const root = document.querySelector('#root');

const appState = {
    passwords: []
}


const renderHome = () => {
    return `
        <div class="app-wrapper">
            <div class="manager-content">
                <h1 class="content__heading">
                    Generate a <br><span class="accent">random Password</span>
                </h1>
                <p class="content__paragraph">Never use an insecure password again</p>

                <button id="gen-pass-btn" class="accent-bg">Generate Passwords</button>
            </div>
            

            <div id="result-area"></div> 
        </div>
        
    `
}


function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}


const getRandomElem = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}


const generatePassword = (length=10, numbersAllow=true, symbolsAllow=true) => {
    let passwordString = '';

    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const lettersUppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const numbers = [1, 2, 3, 4, 6, 7, 8, 9, 10]
    const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

    for(let i = 0; i < length; i++) {
       const randomChar = getRandomElem([getRandomElem(letters), getRandomElem(lettersUppercase), getRandomElem(numbers), getRandomElem(symbols)]);
       passwordString += randomChar;
    }

    return passwordString;
    
}

const renderPasswords = (passwords) => {
    const resultArea = document.querySelector('#result-area');

    resultArea.innerHTML = `
        ${passwords.map(password => `
            <p class="password-elem accent">
                <span class="pass-text>${password}</span>
                <i class="fa-solid fa-clone copy data-password="${password}"></i>
            </p>`).join('')}
    `
}

const navigateTo = (screenName) => {
    let screenHTML = '';

    if(screenName === 'home') {screenHTML = renderHome()}
    root.innerHTML = screenHTML;
}


// click event listeners

document.body.addEventListener('click', (e) => {
    
    if(e.target.id === "gen-pass-btn") {
        const passwordOne = generatePassword();
        const passwordTwo = generatePassword();

        appState.passwords.push(passwordOne);
        appState.passwords.push(passwordTwo);

        renderPasswords(appState.passwords);
        appState.passwords = [];
    }

    if(e.target.classList.contains('copy')) {
        const passwordText = e.target.getAttribute('data-password');
        navigator.clipboard.writeText(passwordText);

        Toastify({
        text: "Copied to Clipboard",
        className: 'copy-toast',
        duration: 2000,
        gravity: "top", // top or bottom
        position: "center", // left, center or right
        backgroundColor: "#10B981",
        close: false
      }).showToast()
    }
})



// init

navigateTo('home');
renderPasswords(appState.passwords);