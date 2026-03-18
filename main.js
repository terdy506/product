
class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const ball = document.createElement('div');
        ball.setAttribute('class', 'ball');

        const number = document.createElement('span');
        number.textContent = this.getAttribute('number');

        const style = document.createElement('style');
        style.textContent = `
            .ball {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: radial-gradient(circle at 20px 20px, var(--ball-color, #f0f2f5), #a0a0a0);
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                font-size: 24px;
                font-weight: bold;
                margin: 0 8px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(ball);
        ball.appendChild(number);
    }

    static get observedAttributes() {
        return ['number', 'color'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'number') {
            this.shadowRoot.querySelector('span').textContent = newValue;
        } else if (name === 'color') {
            this.shadowRoot.querySelector('.ball').style.setProperty('--ball-color', newValue);
        }
    }
}

customElements.define('lotto-ball', LottoBall);

document.getElementById('generate-btn').addEventListener('click', () => {
    const lottoBallsContainer = document.getElementById('lotto-balls');
    lottoBallsContainer.innerHTML = '';
    const numbers = new Set();
    while(numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(numbers).sort((a,b) => a - b);

    sortedNumbers.forEach(number => {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        const color = getColorForNumber(number);
        lottoBall.setAttribute('color', color);
        lottoBallsContainer.appendChild(lottoBall);
    });
});

function getColorForNumber(number) {
    if (number <= 10) return '#f44336';
    if (number <= 20) return '#ff9800';
    if (number <= 30) return '#ffeb3b';
    if (number <= 40) return '#4caf50';
    return '#2196f3';
}
