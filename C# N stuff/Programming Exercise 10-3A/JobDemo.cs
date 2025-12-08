using System;
using static System.Console;
using System.Globalization;
using System.Security.Cryptography.X509Certificates;
using System.ComponentModel;

class JobDemo
{
	static void Main()
	{
		// Write your code here
        Job job1 = new Job(111, "Smith", "exterior paint", 20);
        Job job2 = new Job(112, "Johnson", "kitchen remodel", 35);
        Job job3 = new Job(111, "Smith", "exterior paint", 20); // same job number as job1

        // Display job details
        WriteLine(job1.ToString());
        WriteLine(job2.ToString());
        WriteLine(job3.ToString());
        WriteLine();

        // Demonstrate Equals() method
        WriteLine("Job1 equals Job2? {0}", job1.Equals(job2));
        WriteLine("Job1 equals Job3? {0}", job1.Equals(job3));
        WriteLine();

        // Demonstrate GetHashCode()
        WriteLine("Job1 HashCode: {0}", job1.GetHashCode());
        WriteLine("Job2 HashCode: {0}", job2.GetHashCode());
        WriteLine("Job3 HashCode: {0}", job3.GetHashCode());
	}
}

class Job
{
    // Auto-implemented properties
    public int JobNumber { get; set; }
    public string Customer { get; set; }
    public string Description { get; set; }

    // Private backing fields
    private double hours;
    private double price;

    // Property for Hours with price calculation
    public double Hours
    {
        get { return hours; }
        set
        {
            hours = value;
            price = hours * 45.00;
        }
    }

    // Read-only property for price
    public double Price
    {
        get { return price; }
    }

    // Constructor
    public Job(int jobNumber, string customer, string description, double hours)
    {
        JobNumber = jobNumber;
        Customer = customer;
        Description = description;
        Hours = hours; // Automatically calculates price
    }

    // Equals method
    public override bool Equals(object obj)
    {
        if (obj == null || GetType() != obj.GetType())
            return false;

        Job other = (Job)obj;
        return JobNumber == other.JobNumber;
    }

    // GetHashCode method
    public override int GetHashCode()
    {
        return JobNumber;
    }

    // ToString method
    public override string ToString()
    {
        return $"Job {JobNumber} {Customer} {Description} {Hours} hours @${45.00.ToString("F2", CultureInfo.GetCultureInfo("en-US"))} per hour. " +
               $"Total price is {Price.ToString("C", CultureInfo.GetCultureInfo("en-US"))}";
    }
}
