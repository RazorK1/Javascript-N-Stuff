using System;
using static System.Console;
using System.Globalization;

class ConferencesDemo
{
    static void Main()
    {
        const int NUM_CONFERENCES = 5;
        Conference[] conferences = new Conference[5];

        conferences[0] = new Conference { Group = "Ruby", Date = "April 20", Attendees = 2 };
        conferences[1] = new Conference { Group = "C#", Date = "June 12", Attendees = 30 };
        conferences[2] = new Conference { Group = "Java", Date = "December 12", Attendees = 50 };
        conferences[3] = new Conference { Group = "C++", Date = "July 28", Attendees = 400 };
        conferences[4] = new Conference { Group = "Python", Date = "May 2", Attendees = 1000 };

        Array.Sort(conferences);

        foreach (Conference conf in conferences)
        {
            Console.WriteLine($"{conf.Group} Conference starts on {conf.Date} and has {conf.Attendees} attendees");
        }

    }
}

class Conference : IComparable<Conference>
{
    // Fields
    private string group;
    private string date;
    private int attendees;

    // Properties
    public string Group { get; set; }
    public string Date { get; set; }
    public int Attendees { get; set; }

    public Conference()
    {
        Group = "";
        Date = "";
        Attendees = 0;
    }

    // IComparable implementation
    public int CompareTo(Conference other)
    {
        return this.Attendees.CompareTo(other.Attendees);
    }
}
