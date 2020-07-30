function round(number, decimals = 2) {
    let power = 10 ** decimals;
    return Math.round(number * power) / power;
}
