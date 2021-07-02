# OV Handler
This application is a more of a test to start retrieving data from the dutch public transit system.
Their api's are public and contain lots of data.

## How?
Am using nodejs, this is a relative new framework for me. So designchoices might not be custom to the language.

## Why?
The api is very big, if you build a static application that reads from it you are processing all the data all the time.
By putting nodejs in the middle i am trying to limit the api calls to only the time sensitive data.