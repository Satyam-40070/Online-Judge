var isPalindrome = function (s) {

    if (s.lenght === 0) {
        return True
    }

    let res = ''
    const alphanumeric = /[a-zA-Z0-9]/

    for (let i = 0; i < s.length; i++) {
        if (alphanumeric.test(s[i])) {
            res += s[i].toLowerCase()
        }
    }

    let ip = 0
    let ep = res.length - 1

    while (ip < ep) {
        if (res[ip] !== res[ep]) {
            return false
        }
        else {
            ip += 1
            ep -= 1
        }
    }
    return true
};