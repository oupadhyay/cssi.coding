package others;

public class Main {
    public static void main(String[] args) {
        // Problem: sum of everything except X multiplied
        int[] arr = { 1, 2, 3, 4, 5, 6 };
        compute(arr);
    }

    public static void compute(int[] arr) {
        var sum = 0;
        if (arr == null || arr.length == 1) {
            sum = 0;
        } else {
            var total = 1;
            // add about case with zeros within the array
            for (var i = 0; i < arr.length; i++) {
                total *= arr[i];
            }
            for (var j = 0; j < arr.length; j++) {
                sum += total / arr[j];
            }
            System.out.println(sum);
        }
    }
}
