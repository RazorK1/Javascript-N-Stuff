using System;
using static System.Console;
using System.Globalization;

public class Reverse4
{
    public static void Main()
    {
        int firstInt = 23;
        int secondInt = 45;
        int thirdInt = 55;
        int fourthInt = 67;

        Console.WriteLine($"The numbers are {firstInt}, {secondInt}, {thirdInt}, {fourthInt}");

        Reverse(ref firstInt, ref secondInt, ref thirdInt, ref fourthInt);

        Console.WriteLine($"The numbers are {firstInt}, {secondInt}, {thirdInt}, {fourthInt}");
    }

    public static void Reverse(ref int first, ref int second, ref int third, ref int fourth)
    {
        int temp = first;
        first = fourth;
        fourth = temp;

        temp = second;
        second = third;
        third = temp;
    }
}
