# Bundled Orchestrator Plugins

Bundled Orchestrator plugins included in Rundeck.

## Random Subset

Selects a maximum number of the target nodes at random

### Configuration

Count

: Number of nodes to select from the pool

## Rank Tiered

Processes nodes in a tiered manner, ordered by rank.

Will never process the next rank until all nodes in the previous rank are complete. Uses the configured Rank ordering for the Job.

Note: if a Rank Attribute is not set, then the node names are used as the rank attribute, and the behavior of this orchestrator will essentially be single threaded.

## Max Percentage

Processes at maximum a percentage of the target nodes.

Will never process more than the given percentage of nodes per run at one time regardless of how high threads are configured.

### Configuration

Percent

: Max Percentage (e.g. `33` for 33%)
