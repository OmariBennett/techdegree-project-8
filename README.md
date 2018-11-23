# techdegree-project-8
### Using Gulp to Build a Front End Website.
#### By: Omari Bennett
A Gulp build process to prepare a website for deployment.

Requirements:  
	* Build Process Dependencies  
		&nbsp;&nbsp; -[] Running the npm install command installs the build process dependencies properly
	* Scripts Task  
		&nbsp;&nbsp; -[] The gulp scripts command concatenates, minifies, and copies all of the project’s JavaScript files into an all.min.js file
		&nbsp;&nbsp; -[] The command copies the all.min.js file into the dist/scripts folder
	* Styles Task  
		&nbsp;&nbsp; -[] The gulp styles command compiles the project’s SCSS files into CSS, and concatenates and minifies into an all.min.css file
		&nbsp;&nbsp; -[] The command copies the all.min.css file into the dist/styles folder
	* Source Maps  
		&nbsp;&nbsp; -[] The gulp scripts command generates JavaScript source maps
		&nbsp;&nbsp; -[] The gulp styles command generates CSS source maps
	* Images Task
		&nbsp;&nbsp; -[] The gulp images command copies the optimized images to the dist/content folder.
	* Clean Task
		&nbsp;&nbsp; -[] The gulp clean command deletes all of the files and folders in the dist folder.
	* Build Task
		&nbsp;&nbsp; -[] The gulp build command properly runs the clean, scripts, styles, and images tasks.
		&nbsp;&nbsp; -[] The clean task fully completes before the scripts, styles, and images tasks are ran.
	* Default Task
		&nbsp;&nbsp; -[] The gulp command properly runs the build task as a dependency 
		&nbsp;&nbsp; -[] The gulp command serves the project using a local webserver.
Exceeds Expectations:  
	* Default Task  
		&nbsp;&nbsp; -[] The gulp command also listens for changes to any .scss file. When there is a change to any .scss file, the gulp styles command is run, the files are compiled, concatenated and minified to the dist folder, and the browser reloads, displaying the changes