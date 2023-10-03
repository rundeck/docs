# Getting Started with the API

Using or testing API calls as a part of any integration or development process could be cumbersome due to the big amount of API endpoints that any modern web application contains. Also, since it's very easy to pile up large numbers of calls in scripts scattered in different places, a good solution is to manage that in one place.

In this document, we learn how to centralize Rundeck API calls using the Postman application, and provide a way to export those calls to any script or programming language.

# The Rundeck API

Rundeck provides a Web API for use with your applications. An API (Application Programming Interface) is a set of functions (called Endpoints) that allows applications to access data and interact with a Web Application, e.g: a test curl POST call to run a job from the shell:

```
curl --location --request POST 'http://localhost:4440/api/41/job/50aa1e22-3e75-41fd-aa07-0cc5e5b2666e/run' \
--header 'Accept: application/json' \
--header 'X-Rundeck-Auth-Token: EsMOdQNJy43Jg3WbtkGEGp3L3T1yhZ4w' \
--header 'Content-Type: application/json' \
--data-raw ''
```

An API delivers a user response to a Rundeck Instance and sends the proper response back to a user. 

You can find a complete Rundeck API reference [here](https://docs.rundeck.com/docs/api/rundeck-api.html).


# Postman

Postman is an API platform for building and using APIs. Postman simplifies each step of the API lifecycle and streamlines collaboration so you can create better APIs. With Postman it's possible to create a Collection and then save any API endpoint call there. Postman is available [here](https://www.postman.com/downloads/), and the installation process is described [here](https://learning.postman.com/docs/getting-started/installation-and-updates/).


# Running the Welcome Project and New User Token Creation

This tutorial is based on the Welcome Project and Community Welcome Project ([here](https://docs.rundeck.com/docs/learning/howto/welcome-project-starter.html) is how to run both projects). You can use both to test some Rundeck API endpoints.

1. Launch the Welcome Project (or Community Welcome Project) following [these](https://docs.rundeck.com/docs/learning/howto/welcome-project-starter.html#installing-the-welcome-project) instructions.

2. Enter as an admin user (user: `admin`, password: `admin`).

3. Click on the user icon (upper right) and then click on “Profile”.



![](/assets/img/api_1_profile.png)


4. Click on the "+" button.



![](/assets/img/api_2_tokens.png)


5. Give a name to the token and then save it.



![](/assets/img/api_3_gen_token.png)



![](/assets/img/api_4_save_token.png)


# Creating a Postman Collection and The First Rundeck API Call (Rundeck System Info)

1. Launch Postman and then click on the "Create a new Collection" link.



![](/assets/img/api_5_post_coll.png)

2. Give it a name, in the “variables” tab define the Rundeck instance hostname (as `localhost` in this example), port (`4440` as default Rundeck TCP port), and API version (`41` at this moment), this variable definition avoids the need to edit each request in case of hostname/port/api version change. Then click on the "Save" button. 



![](/assets/img/api_6_post_name.png)


3. Now go click on the  “Authorization” tab, select “API Key” on Type, put `X-Rundeck-Auth-Token` in the “Key” textbox, and add the variable `rdeck_api_token` created in the previous step (using the `{{rdeck_api_token}}` notation), finally on “Add to” list, select “Header” and click on the Save button.



![](/assets/img/api_7_post_auth.png)

The Collection is created so now we can get some data from Rundeck using the API.

3. Click on the "Add a request" link from the Scratch Pad panel.



![](/assets/img/api_8_post_addreq.png)

4. To get the Rundeck System Information select the "GET" method and the following endpoint:

`{{rdeck_hostname}}:{{rdeck_port}}/api/{{rdeck_api_version}}/system/info` 

Then click on the "Headers" tab and add a new one with `Accept` as a key and `application/json` as a value. 

To test it, just click on the "Send" blue button at the right of the endpoint string.



![](/assets/img/api_9_post_send.png)


# Running a Rundeck Job

To run a Rundeck Job from the API, the method "POST" is needed.

1. On Postman click on the “...” next to the Rundeck collection (left panel), then select “Add Request”, after that, an empty request is created.



![](/assets/img/api_10_post_runjob.png)

2. Select the "POST" method and the following endpoint:


```
{rdeck_hostname}}:{{rdeck_port}}/api/{{rdeck_api_version}}/job/3a13fca8-4d42-417e-812b-5f2f700dccb3/run
```


The `3a13fca8-4d42-417e-812b-5f2f700dccb3` string is the Rundeck job ID.

3. In the "Headers" tab add a new request with `Accept` as a key and `application/json` as a value.

4. Click on Save Icon.

5. Give it a name, select the Rundeck Collection and then click on the "Save" button.

6. Now, call the endpoint by clicking on the "Send" button.



![](/assets/img/api_11_post_send.png)


# Running a Job with Options

The Welcome Project job called "Using Input Options in command and scripts" contains an option to test it on Postman.

1. On Postman click on the "+" tab to create a new request.

2. Select the "POST" method and the following endpoint:


```
{rdeck_hostname}}:{{rdeck_port}}/api/{{rdeck_api_version}}/job/3a13fca8-4d42-417e-812b-5f2f700dccb3/run
```


The `05029d94-bde4-487a-ac0d-03fc7f659c38` string is the job ID.

3. In the "Headers" tab add a new one with `Accept` as a key and `application/json` as a value.

4. Now click on the Body tab, select "raw" in the left dropdown menu and then select "JSON". Now put the following content:


```
{
	"options": {
    	  "input_key":"HelloWorld"
	}
}
```




![](/assets/img/api_12_post_raw.png)



![](/assets/img/api_13_logs.png)

5. Click on Save Icon.

6. Give it a name, select the Rundeck Collection and then click on the "Save" button.

7. Now, call the endpoint by clicking on the "Send" button.

8. Go to the Rundeck instance, click on the Activity icon (left) and see the last execution.


# Export Postman Requests to Any Language

Postman provides the ability to export a request to other languages like Python or JavaScript. 

To export a request, click on the code icon (right) and select the language. The API call should be displayed and you can export it. 



![](/assets/img/api_14_post_export.png)


![](/assets/img/api_15_post_export.png)



# Resources

A complete Rundeck API reference is available [here](https://docs.rundeck.com/docs/api/rundeck-api.html).

[Here](https://documenter.getpostman.com/view/95797/rundeck/7TNfX9k#36bbd9c4-3186-56f4-aae2-90f5c9f097a8) are a lot of examples of Postman and Rundeck API endpoints calls.
