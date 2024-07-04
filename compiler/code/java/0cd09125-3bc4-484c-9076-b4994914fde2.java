import java.util.Scanner;

public class PalindromeChecker {

    public static int isPalindrome(String s) {
        int n = s.length();
        int left = 0;
        int right = n - 1;

        while (left < right) {
            if (!Character.isLetterOrDigit(s.charAt(left))) {
                left++;
                continue;
            }
            if (!Character.isLetterOrDigit(s.charAt(right))) {
                right--;
                continue;
            }
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return 0;
            } else {
                left++;
                right--;
            }
        }
        return 1;
    }

    // Define the main function
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String str = scanner.nextLine();
        System.out.println(isPalindrome(str));

        // Close the scanner
        scanner.close();
    }
}
