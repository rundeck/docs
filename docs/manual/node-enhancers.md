# Node Enhancers

Rundeck offers node enhancers to help you to better organize, manage and keep up to date on the status of your nodes. There are three different node enhancers: Attribute Match, Icon and Health Check (Enterprise).  

## Attribute Match

The attribute match enhancer is a way for you to add new attributes to various nodes. This is done by finding attribute matches. So, any nodes with attributes matching the one specified will have the new attributes added to them.

![Attribute Match](~@assets/img/attribute_match.png)

- **Attribute Matches**
: This is where you specify the attribute that you want to search for. By doing so, you can add new attributes to the nodes that match based off of what you input this section. 

- **Attributes to Add**
: This is where you specify the new attributes that you wish to add to the nodes that matched the attributes you specified above. So, any attributes you put here will show up on all the nodes that match based off your Attribute Matches input. 

- **Tags to Add**
: This is where you specify any tags you want added to the nodes that match. You can enter numerous tags, all separated by a comma. 

## Icon

This node enhancer allows you to add icons to the nodes that you already have on Rundeck. In order to do so, you need to specify an attribute. By doing so, the icon will be applied only to the nodes that contain that attribute. 

![Icon](~@assets/img/icon_badge.png)

- **Attribute Name**
: This is where you specify the attribute name. Any node that has that attribute will have the icon applied to it. 

- **Attribute Name**
: This is where you specify an exact attribute name. If there is an exact match then the icon will be added to that node/those nodes. 

- **Icon Name**
: This is where you specify the icon that you want to apply to the nodes. In order to do so, you need to choose an icon from either the Font-Awesome icons or the Glyphicon icons. Depending which you choose, the name needs to start with "glyphicon-" or "fa-." 

## Health Checks (Enterprise)

Our Enterprise customers also have access to a health check node enhancer. To learn more, please visit [Health Checks](/manual/healthchecks.md).