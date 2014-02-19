JS Test Runner Sample Project
=============================

This is a sample project for using [PhantomJS](http://www.phantomjs.org/) and
[JS Test Runner](http://js-testrunner.codehaus.org/usage.html) to automate javascript testing.
The tests are written using [QUnit](https://github.com/jquery/qunit) and [Sinon](http://sinonjs.org/qunit/).

Maven
=====

The pom has the jetty plug-in for testing on a server.

mvn jetty:run

Once the server is running, use this URL to run the tests in the browser.

http://localhost:8080/validation.html

When doing a build (mvn install) the tests will be run automatically. The test server will try to bind to
port 8080, so either change it or make sure nothing else is using it.

Eclipse
=======

To run the tests in eclipse, you'll need to change the test runner and add this command-line argument:

-Dorg.codehaus.jstestrunner.commandPattern="C:/phantomjs-1.3.0-win32-static/phantomjs.exe '%1$s' %2$s"

See the screenshot runasconfig.png.


Release Notes
-------------

v1.1

Feb 18, 2014
- Updated software versions 
- Updated maven dependencies
- Tested against phantomjs version 1.9.7 
