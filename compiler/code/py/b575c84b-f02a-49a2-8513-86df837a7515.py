def is_palindrome(s):
    left, right = 0, len(s) - 1

    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return 0
        left += 1
        right -= 1
    return 1

if __name__ == "__main__":
    input_str = input()
    print(is_palindrome(input_str))
