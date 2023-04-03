# DRIVE PHOTO SELECTOR

Simple javascript class to get photos from a google drive folder. It will return a class containing the name, link to the thumbnail and link to the actual photo.

This was done as a student research project

## How to

just call the class Seeker and pass a https link. Then call downloadPage() and it will return an array of photos as described above as a Promise<DriveImage>.

You can pass 'true' to the constructor of the class to activate the logging and keep track of how the process is going