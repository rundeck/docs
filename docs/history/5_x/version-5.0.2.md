---

title: "5.0.2 Release Notes"
date: 2024-02-08
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: "Important Compatibility Updates for 5.X"

---

# 5.0.2 Release Notes

Name: <span style="color: deeppink"><span class="glyphicon glyphicon-book"></span> "Denali deeppink book"</span>
Release Date: February 8th, 2024

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

## Overview

The 5.0 and 5.0.1 releases had some un-intended compatibility issues that this 5.0.2 version is meant to address.  Details listed below about the issues from previous versions and the changes included.

### Release Details

::: warning Upgrade Steps
Be sure to follow the [Upgrade instructions](/upgrading/) when moving to version 5.0 or higher.  There are new minimum Java versions and other important information.
:::

#### Remove mandatory Enterprise Runner upgrade.

It is no longer required to update the Enterprise Runner when upgrading to 5.x.

#### 5.x job definitions can now work on 4.x

This version does fix an issue where job definitions created in 5.x were not usable in older product versions.  It's important to note that not all job definitions are backwards compatible if the job uses plugins or features not available on the older system, but this fix addressed some foundational issues with backwards compatibility for job definitions.

#### XML API Support
XML Support for the API is deprecated and future endpoints/enhancements will not support XML, but there is an option to turn it on for legacy needs.  This version repaired an issue when enabling "legacyXML" feature of the API.

#### JSON/JQ Filter Quoting Behavior

In 5.0 we updated the JSON/JQ libraries and from that update the behavior of the filter improved in the form of performing much closer to a command line version of `jq`.  This version adds an option flag to allow it to continue to add quotes as seen in previous product versions.  New instances of the JSON/JQ Log filter will default to the new/improved behavior.  Existing jobs will maintain the original behavior until a change is made to that log filter.


## Community Contributors

Submit your own Pull Requests to get recognition here!

* Rui Melo Amaro ([rmeloamaro](https://github.com/rmeloamaro))


## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Alberto Hormazabal Cespedes ([ahormazabal](https://github.com/ahormazabal))
* Alexander Abarca ([alexander-variacode](https://github.com/alexander-variacode))
* Antony Velasquez Ruiz ([avelasquezr](https://github.com/avelasquezr))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Christopher McCarroll-Gilbert ([chrismcg14](https://github.com/chrismcg14))
* Darwis Narvaez ([DarwisNarvaezDev](https://github.com/DarwisNarvaezDev))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Imad Jafir ([imad6639](https://github.com/imad6639))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Jason Brooks ([jbrookspd](https://github.com/jbrookspd))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Leonel Juarez ([L2JE](https://github.com/L2JE))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Osman Albarran ([Oalbarran94](https://github.com/Oalbarran94))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
