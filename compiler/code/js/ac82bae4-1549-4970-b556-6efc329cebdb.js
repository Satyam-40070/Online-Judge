const readline = require('readline');

function isPalindrome(s) {
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
      return 0;
    }
    left++;
    right--;
  }
  return 1;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('', (input) => {
  console.log(isPalindrome(input));
  rl.close();
});
