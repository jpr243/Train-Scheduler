# Train-Scheduler

Overview


The objective was to create a train schedule application that incorporates Firebase to host arrival and departure data. The app retrieves and manipulates this information with Moment.js. The website provides up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.


When adding trains, administrators should be able to submit the following:

- Train Name
- Destination
- First Train Time -- in military time
- Frequency -- in minutes

The app is coded to calculate when the next train will arrive; relative to the current time.

Users from many different machines must be able to view same train times.
