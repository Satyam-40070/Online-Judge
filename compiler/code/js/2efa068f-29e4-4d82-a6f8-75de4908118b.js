const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const isPalindrome = (s) => {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        while (left < right && !s[left].match(/[a-zA-Z0-9]/)) {
            left++;
        }
        while (left < right && !s[right].match(/[a-zA-Z0-9]/)) {
            right--;
        }
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        left++;
        right--;
    }
    return true;
};

rl.question('Enter a string: ', (inputStr) => {
    const result = isPalindrome(inputStr);
    console.log(result ? "True" : "False");
    rl.close();
});
