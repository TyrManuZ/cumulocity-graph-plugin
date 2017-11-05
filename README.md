# Cumulocity Plugin Example
A small example of a graph plugin to visualise measurements with a different library (dygraphs). This example uses a different measurement strucutre to store more efficiently and reduce loading time of lots of measurement data.

# Instructions
The plugin can be build and deployed using the c8y CLI tool like describe in the Cumulocity docs. The device and time range that is displayed in the graph is hard coded.
There are two python scripts to generate the measurement data for exactly this time range. However if you try it yourself the deviceId might be different and needs to be change in the controller code of the plugin.
