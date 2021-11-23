# Google Cloud Platform - Compute VM Node Source

[Google Cloud Platform](https://cloud.google.com) (GCP) is a cloud service in wide use for dynamic infrastructure; it is easy to start up and shut down Node "Instances" in the cloud.


## Configuring the Node Source
To configure Authentication please use this page as a reference to gather the information below. [Creating and Managing Service Account Keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).

**Project ID**
: Specify your GCP Project ID.

**Zone**
: Specify your GCP Secret Key. If using the GCP Node Source it's possible to use `${node.zone}` and the Zone will be dynamically populated with the region for that node.

**Access Key Path**
: Path to Key Storage entry containing the Access Key.

> Note: This node source does not support pulling these settings from the System Configuration.

## Filtering Nodes

**Just running instances**
: Will return only running instances to populate the Node listing.

**Defined Tag Name for custom Attributes**
: <TBD>
