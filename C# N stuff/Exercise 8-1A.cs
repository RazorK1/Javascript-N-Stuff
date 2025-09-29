using System;
using static System.Console;
using System.Globalization;

class Reverse3
{
	public static void Main()
	{
		int firstInt = 23;
		int middleInt = 45;
		int lastInt = 67;

		Console.WriteLine("The numbers are {0}, {1}, {2}", firstInt, middleInt, lastInt);

		Reverse(ref firstInt, ref middleInt, ref lastInt);

		Console.WriteLine("The numbers are {0}, {1}, {2}", firstInt, middleInt, lastInt);
	}

	public static void Reverse(ref int first, ref int middle, ref int last)
	{
		int temp = first;
		first = last;
		last = temp;
	}
}
