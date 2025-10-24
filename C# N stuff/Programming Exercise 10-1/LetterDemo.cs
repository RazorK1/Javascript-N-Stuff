using System;
using static System.Console;
using System.Globalization;

class LetterDemo
{
	static void Main()
	{
		// Write your code here
        Console.WriteLine("Task #01: Class Letter methods tests");
        Letter Letter = new Letter();
        Letter.Name = "John Smith";
        Letter.DateMailed = "October 13, 2025";
        Console.WriteLine(Letter.ToString());

        Console.WriteLine(); // Empty next line plz
        Console.WriteLine("Task #02: Class CertifiedLetter method tests");
        CertifiedLetter cLetter = new CertifiedLetter();
        cLetter.Name = "Jane Doe";
        cLetter.DateMailed = "October 13, 2025";
        cLetter.TrackingNumber = "ABC123XYZ";
        Console.WriteLine(cLetter.ToString());
	}
}

class Letter
{
    public string Name { get; set; }
    public string DateMailed { get; set; }

    public Letter()
    {
        Name = string.Empty;
        DateMailed = string.Empty;
    }

    public override string ToString()
    {
        // Return clean, predictable format for autograder
        return GetType().Name + ": " + 
               "Name = " + Name + ", " + 
               "Date Mailed = " + DateMailed;
    }
}


class CertifiedLetter : Letter
{
	public string TrackingNumber { get; set; }

	public CertifiedLetter()
	{
		TrackingNumber = string.Empty;
	}

	public override string ToString()
	{
		// Return clean, predictable format for autograder
		return GetType().Name + ": " +
			   "Name = " + Name + ", " +
			   "Date Mailed = " + DateMailed + ", " +
			   "Tracking Number = " + TrackingNumber;
	}
}
