# ChorServer
It is a temporary project for development and tests of the server function for the `chorhackers` project. Before the functional integration to `chorhackers` everything related and tutorial outcomes are shown here as interchanges.

So if you are really not interested in our chorus or any news about music, just [go to here](#chorserver-angular) to see the info of codes.

## Short Introduction
+ `chorhackers` is an approach from the Munich Chinese chorus group MuniChor ([Facebook](https://www.facebook.com/munichor/), [Youtube](https://www.youtube.com/channel/UC4ftcc5uT0qQ1HcxX13kxDA)), which purpose is to create a series of useful tools to organize a computer-aided / AI-aided rehearsal process.

+ In MuniChor there is a sub-program with name of Tadpoles with orientation of a-capella arrangements. After the last regroup in chorus the Tadpoles' Project works as a pioneer for testing every new idea in matters of the whole group. `chorhackers` tends to be tested at first with recording resources from Tadpoles and be considered as a showcase.

## ChorServer Angular
+ A website for testing all server functions and web-audio related developments
+ It is considered as a group-learning program.

#### 05 Feb 2018
+ It sends an example music to the client, and let listeners to adjust the playing tempo with preserved pitch by a slider.

### Branches
+ `master`: the (almost) stable version under angular framework
+ `granular`:  the version under angular framework for testing the real-time tempo-shift (current stage of development)
+ `min_ios`: the compatible version for IOS. Now the Angular-cli version cannot be opened under IOS. This version is written in flattened AngularJS just for test (wip).

### Run
+ The project is generated by [Angular CLI](https://github.com/angular/angular-cli) (version 1.6.5).
+ The server (`server.js`) in `express` is linked to the angular-built folder `./dist`. The only implemented URL is pointed to the song in `files` (_on top of the world_, self arranged and recorded) as an example.
+ To test the server, be sure `node` with `npm` is installed on your computer.
+ Run `npm install` to install the necessary external packages after your clone.
+ Just to check the website without modification of source codes, the angular-cli is not required. From the project root folder, run `node server`. Then go to `localhost:3000` on the browser.
+ If you want to modify any codes and test, angular-cli should be installed globally by npm. Use `npm install -g @angular/cli` to install the latest version.
+ For any modifications the project should be built at first, because the `server.js`
+ Now the URL is served for just push up the song as a `buffer`. The URL can be built into any other developments (such as `chorhackers`).
+ The actual server is under evaluation process within an alpha-test in chorus group. The libraries which should be written for more general applications will be connected to this repository as a bundle.
+ The website uses a little and tends to use more from `@angular/material` for UI.
+ For more technical details and plans please see other documentations.

### Be in
+ Any issue reports and pull requests are welcome!
+ If you are in Munich and interested in our chorus group, just [send us a message](mailto:munichorgroup@gmail.com)!

## Useful External Reference
#### 05 Feb 2018
+ [web-audio-beat-detector](https://github.com/chrisguttandin/web-audio-beat-detector) by chrisguttandin. A great tool for the tempo detection of our web-audiobuffers.
+ [soundbank-granular](https://github.com/mmckegg/soundbank-granular) by mmckegg. He has created lots of useful tools / pacakges for Web Audio. Really Great. Thanks! I am just learning everything from you :D ([see this](https://github.com/mmckegg/web-audio-school)).
