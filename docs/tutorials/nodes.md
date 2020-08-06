# Listing and filtering nodes

With the new model source in place and the project configuration updated, the
administrator can begin listing the nodes in Rundeck and dispatch commands.

Clicking on the "Nodes" tab and using the drop down to choose "Select All Nodes"
in the anvils project will display all the nodes that have been configured.
The screenshot below shows the listing with 6 nodes.

![Anvils Nodes List](~@assets/img/tutorial-nodeslist.png)

The tags allow filtering nodes by their functional role. Below shows
just the nodes tagged "www":

![Filtered nodes](~@assets/img/tutorial-nodesfiltered.png)

The screenshot shows the filter form with an expression: `tags: www`.
Node filtering uses a simple syntax. You can match nodes by specifying
the attribute name (eg, tags) and the value of the tag (eg, www).

These tags will be used in the next chapters to run commands and define jobs.
