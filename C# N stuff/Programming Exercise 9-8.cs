using System;
using static System.Console;
using System.Globalization;

class ConferencesDemo
{
    static void Main()
    {
        const int NUM_CONFERENCES = 5;
        Conference[] conferences = new Conference[NUM_CONFERENCES];

        for (int i = 0; i < NUM_CONFERENCES; i++)
        {
            conferences[i] = new Conference();

            Write($"Enter group name for conference #{i + 1}: ");
            conferences[i].Group = ReadLine();

            Write($"Enter start date for conference #{i + 1}: ");
            conferences[i].Date = ReadLine();

            Write($"Enter number of attendees for conference #{i + 1}: ");

            int attendees;
            while (!int.TryParse(ReadLine(), out attendees))
            {
                Write("Invalid input. Please enter an integer: ");
            }
            conferences[i].Attendees = attendees;
        }

        Array.Sort(conferences);

        WriteLine("\nSorted Conferences by Attendance:");
        foreach (Conference conf in conferences)
        {
            WriteLine($"{conf.Group} Conference starts on {conf.Date} and has {conf.Attendees} attendees");
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
    public string Group
    {
        get { return group; }
        set { group = value; }
    }

    public string Date
    {
        get { return date; }
        set { date = value; }
    }

    public int Attendees
    {
        get { return attendees; }
        set { attendees = value; }
    }

    // Default constructor
    public Conference()
    {
        group = "";
        date = "";
        attendees = 0;
    }

    // IComparable implementation
    public int CompareTo(Conference other)
    {
        return this.attendees.CompareTo(other.attendees);
    }
}
