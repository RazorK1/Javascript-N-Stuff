using System;
using static System.Console;
using System.Globalization;
class PhotoDemo
{
	static void Main()
	{
		// Write your code here
		Photo p1 = new Photo(8, 10);
        Photo p2 = new Photo(8, 9);
        MattedPhoto m1 = new MattedPhoto(10, 12, "white");
		FramedPhoto f1 = new FramedPhoto(8, 10, "silver", "modern");
		
		WriteLine(p1.ToString());
        WriteLine(p2.ToString());
        WriteLine(m1.ToString());
        WriteLine(f1.ToString());
	}
}

class Photo
{
	protected double price;
	public int height;
	public int width;

	protected string color;
	protected string material;
	protected string style;

    public int Width
    {
        get { return width; }
        set { width = value; SetPrice(); }
    }

    public int Height
    {
        get { return height; }
        set { height = value; SetPrice(); }
    }

	// Default constructor
	public Photo() { }

	// Constructor with dimensions
	public Photo(int w, int h)
	{
		Width = w;
		Height = h;
	}
	
    // Determine price based on size
    private void SetPrice()
    {
        if ((width == 8 && height == 10) || (width == 10 && height == 8))
            price = 3.99;
        else if ((width == 10 && height == 12) || (width == 12 && height == 10))
            price = 5.99;
        else
            price = 9.99;
    }

    public double Price
    {
        get { return price; }
    }

    public override string ToString()
    {
        return $"{GetType().Name} {Width} X {Height}   Price: ${price.ToString("C")}";
    }

}

class MattedPhoto : Photo
{
	public string Color { get; set; }
    public MattedPhoto() { }
    public MattedPhoto(int w, int h, string color) : base(w, h)
    {
        Color = color;
        price += 10; // add $10 for matting
    }

    public override string ToString()
    {
        return string.Format("{0}   {1} matting {2} X {3}   Price: {4}",
            GetType().Name, Color, Width, Height,
            price.ToString("C", CultureInfo.GetCultureInfo("en-US")));
    }

}

class FramedPhoto : Photo
{
    public string Material { get; set; }
    public string Style { get; set; }

    public FramedPhoto() { }

    public FramedPhoto(int w, int h, string material, string style) : base(w, h)
    {
        Material = material;
        Style = style;
        price += 25; // add $25 for frame
    }

    public override string ToString()
    {
        return $"{GetType().Name}   {Style}, {Material} frame. {Width} X {Height}   Price: {price.ToString("C")}";
    }
}
