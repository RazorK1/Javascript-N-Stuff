using System;
using static System.Console;
using System.Globalization;
class PhotoDemo
{
	static void Main()
	{
		// Write your code here
		Photo photo = new Photo();
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

}

class MatteredPhoto
{
	public string Color { get; set; }

}

class FramedPhoto : Photo
{
	public string Material
	{
		set
        {
			material = silver;
        }
    }

	public string Style
    {
		set
        {
            style = modern;
        }
    }
}
