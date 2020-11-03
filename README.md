# gm2m
Using phones to look at stellar models.

## Overview

## How to use
visit https://block.cs.brown.edu/gm2m/src/ to check out the app! 
If you would like to view local changes, open up a terminal and navigate to the directory this repo is stored. 
In the src folder, run `python SimpleHTTPServer 8080`. This will open the app on your local 8080 sever, and you
can open this in a web browser at localhost:8080.

## How to add new tours
- First, open the index.html file. In this file, you will find the html code that holds all of the assests that show up in the app. 
In order to add a new tour to our app, we have to add some new elements under our camera rig object.
- Once you have located the camera rig entity in the hierachy, look for the controller a-entity html element. Inside this html
element is where all of the tour information is held. 
- Now that you have found where to place a new tour, lets add one to the hierachy. Tours are a-curve objects that contain information
about where the camera rig should be. You can follow the example in the image for creating an a-curve object for a tour destination.
The key components of the a-curve object are:
```
- an id component that labels what the tour destination is named.
- a tour component that holds information about the tour itself. Check tour.js for more information about the different properties you can set. The main property to 
keep in mind is text, which will display once the destination has been reached.
- a-curve-point elements hold points of the curve that the camera rig will travel upon.
```
- The tours that you create will be traveled to in decending order, so put the ones you want the user to visit to first at the top!
