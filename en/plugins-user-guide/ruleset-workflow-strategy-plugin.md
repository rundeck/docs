% Ruleset Workflow Strategy Plugin

<!---
Original: http://support.rundeck.com/customer/en/portal/articles/2745900-ruleset-workflow-strategy-plugin-advanced-workflow-
--->

The Ruleset Workflow Strategy Plugin (exclusive to Rundeck Pro) allows you to define a set of rules to describe when and if steps in the workflow should run.

The plugin can be selected in the Workflow Strategy list in the the Edit Job page.
 
The rules configuration value is a multiline block of text in the following format.

## Rules syntax

Rules define how each step should run. You can add one rule per-line. Rules are additive, and you can define multiple rules for each step.
Rules are in the form:

```
STEP [directive] [conditions...]
```

This indicates which step or steps the rule applies to, and any directives or conditions for the step.
The rule must have a directive or condition, or both.

### Step

Specifies the step or steps that the rule applies to. You must include the [ and ] characters:

* `[X]`: Applies to a single step, the named or numbered step X. You can use the step number, e.g. `[1]` or the label, e.g. `[Deploy QA]` (case sensitive).
* `[X,Y,Z...]`: Applies to multiple steps. Separate multiple steps with a comma, e.g. `[1,Deploy,3]`
* `1[*]1`: Applies to all steps

### Directive

Directives optionally define when a step should start. You can define a directive rule for all steps `[*]` using run-at-start or run-in-sequence.

* `run-at-start`: Run at workflow start time. The indicated steps will start immediately when the workflow starts.
* `run-in-sequence`: Run after the previous step in sequence is run or is skipped.
* `run-after:X[,Y[,Z..]]`: Run after one or more steps run or are skipped.
 
### Conditions

Conditions can define additional checks that must pass before a step can run, or determine when a step can be skipped. For example:

* `if:expression`
* `unless:expression`

`expression` defines a comparison or match that will be checked. Valid expressions are:

* `key.name==string`: a context variable such as option.myoption has a certain value
* `key.name!=string`: not-equal check
* `key.name=~pattern`: regular expression match
* `key.name!~pattern`: negative regular expression match
* `!key.name context`: variable is unset

## Examples

Run steps 2 and 5 only after step 1 is done:

```
[2,5] run-after:1
```

Choose between 5 and 6 based on an option value:

```
[*] run-in-sequence
[5] if:option.env==QA
[6] unless:option.env==PRODUCTION
```

Run step 1, then steps 2 and 3 in parallel, then step 4

```
[2] run-after:1
[3] run-after:1
[4] run-after:2,3
```
