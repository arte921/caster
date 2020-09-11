const round = (number, decimals = 2) => {
    let power = 10 ** decimals;
    return Math.round(number * power) / power;
}

const randomcolor = () => `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;