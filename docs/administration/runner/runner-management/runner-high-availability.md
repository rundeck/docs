## Runner High Availability

The Runners poll for available work, and retrieve all available work items for the Rundeck instance. The tasks are then queued locally (the queue is persistent on disk) to the Runner and executed, with a [tunable maximum number](/administration/runner/runner-management/managing-runners.md#runners-status) of simultaneous operations (default: 50). If a Runner is restarted in the middle of an operation, it will resume executing from the local work queue.

If multiple Runners match the tags set for a Job in the runner filter, then the “best” Runner is selected. Currently the “best” evaluation simply takes into account whether a Runner is Healthy based on the last checkin timestamp, and sorts them by the number of in-flight operations. The runner with least number of running operations, or if there is a tie, the most recent checkin is selected to execute the job. This behavior may be changed in the future.

