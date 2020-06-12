# JSON jq key/value mapper

This log filter will parse JSON data in a rundeck job step and create key-value data as Rundeck variables in the data context. The filter uses the jq library to make jquery searches into the data returns.

## Usage

The filter has 3 fields:

- *jq Filter* - jquery-style filter against the log output for the Rundeck job step this filter is attached to. Required.
- *Prefix* - optional result prefix that will be used in the Rundeck data context as the variable key.
- *Log Data* - checkbox. If true, log the captured data to the job’s log stream.

The example below will filter the log results of a Rundeck API query. Using the HTTP Request Node Step and a working API token for your Rundeck user:

![](@assets/img/logfilter-jsonjq-example1.png)

The API results in our demo Rundeck instance look like this:

![](@assets/img/logfilter-jsonjq-example2.png)

Apply the JSON jq key/value Mapper filter to the HTTP Request node step:

![](@assets/img/logfilter-jsonjq-example3.png)

Now, when running the job, the log filter creates the following data variable:

![](@assets/img/logfilter-jsonjq-example4.png)

So it can be used in later job steps:

![](@assets/img/logfilter-jsonjq-example5.png)

With the results:

![](@assets/img/logfilter-jsonjq-example6.png)
