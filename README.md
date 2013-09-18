DPI ♥ 
=====

Easily find the DPI/PPI of any screen
-------------------------------------

### FAQ

#### “It’s actually PPI, not DPI!”

There are arguments for both terms. In general PPI is a bit more correct but DPI is more commonplace, hence its usage on this site (also ppi.lv wasn’t available :P). If you are interested, you can read more on this in the Wikipedia article about Pixel Density.

In more recent terminology, DPI is often used for the actual device pixels and Dots Per Pixel (dppx) for the amount of device pixels per CSS pixel (e.g. in Retina displays this will be 2).

#### What does DPI/PPI mean?

In the context of screens, DPI (Dots Per Inch) or PPI (Pixels Per Inch) refer to the number of device pixels per inch, also called “pixel density”. The higher the number, the smaller the size of the pixels, so graphics are perceived as more crisp and less pixelated. The concept of DPI is also used in printing, although the dots and their formation is different there. In general, good quality printing uses around 300dpi which is higher than most displays. That’s why vector-based or high-res bitmap graphics usually look more crisp when printed.

#### What’s the point of this site?

I got fed up with marketing speak and buzzwords often used to create the impression that a display is much better than it actually is, so I wanted to help people decide what to get with the actual numbers at hand, through an easy to use web app. Also, it was kinda fun to make. :-)

#### Higher DPI = Crisper graphics?

DPI/PPI is a crucial metric for getting an idea of how crisp a display really is, but it’s only one factor among many. Besides the technical ones (which would need an entire book), there are also those that depend on human nature.

Firstly, viewing distance can affect the perceived pixel size. Therefore, if a cell phone and a large screen have the same pixel density, the large screen will appear more crisp, as it’s typically viewed from a longer distance. This is why large screens can get away with considerably lower pixel densities. In the print world, that’s why posters are printed at a much lower dpi than magazines.

Secondly, our eyes cannot discern the difference between pixel densities above a certain threshold. This threshold seems to vary depending on the source, but here are a few good articles if you’re interested:

#### Adding devices to the 'Known Screens' list

Just add the device to the list in screens.json

	{
		"name": "Samsung Series 5 Chromebook 550",		// Device name
		"w": 1280,										// Screen Width
	    "h": 800,										// Screen Height
	    "d": 12.1,										// Diagonal Length of screen (inches)
	    "ppi": 125 										// PPI
  	} 	 
