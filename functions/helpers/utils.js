function pow2(n){
    if(n % 2 == 1) return false;
    while(n % 2 == 0){
        n = n / 2;
    }
    if(n == 1) return true;
    return false;
}

module.exports = {
    pow2: pow2
}