---

prev:
  link: '/learning/getting-started/rba/runner-setup.md'
  text: "Create a Runner to connect to remote nodes"

---

# Add and connect to a node through the Runner

Now that a Runner has been configured, the next goal is to run a job on a test machine in your environment.  This will require a bit more configuration.  These instructions are designed with a Linux machine in mind and you’ll need a few pieces of information to complete these steps:

* An IP address or hostname that can be reached from the Runner
* A private key (usually a .pem file) for connecting to the node with SSH 

## Add key to keystore

PagerDuty’s Process Automation products have a built-in keystore for storing keys and passwords.  In this section, you’ll upload the private key needed to connect from the Runner to the test node.

1. Access Key Storage for the Project by clicking the Project Settings gear at the bottom left and then click Key Storage  
![Choose key Storage under Project Settings](/assets/img/noderun1.png)  
2. In Key Storage, click the **Add or Upload a Key** green button  
![Click Add or Upload](/assets/img/noderun2.png)  
3. Ensure that **Private Key** is selected for the **Key Type** then select **Upload File** from the menu at the left.  
![Select Private Key](/assets/img/noderun3.png)  
4. After selecting Upload File, click the **Choose File** button to browse and select a private .pem key for connecting to your test node through SSH  
![Choose File](/assets/img/noderun4.png)  
5. Enter a name for the key in the name field, such as **testkey**, then click the green Save button at the bottom  
![Enter Name](/assets/img/noderun5.png)  

## Add a test node

Next, we’ll add your test machine to the project as a node.  Nodes can be defined manually or dynamically using Node Sources, which are configured under Project Settings.  In this case, as with most testing, we’ll add the node information using a source called Node Wizard.  if you don't see the Node Wizard, you can add it in by clicking **Edit Nodes | Sources | Add a new Node Source** under the **Project settings** gear at the bottom left.  

6. Click the **Project Settings** gear at the bottom left, then **Edit Nodes**  
![Click Edit Nodes under project Settings](/assets/img/noderun6.png)  
7. On the Edit tab under Edit Nodes, click **Modify** for the Node Wizard  
![Click Modify](/assets/img/noderun7.png)  
8. On the Edit Nodes File screen of the Node Wizard, click the **Add Node** button  
![Add Node](/assets/img/noderun8.png)  
9. Under Add Node | Detail, enter values for **Node Name**, **Host Name/IP**, **OS Family** and **tags**  
![Node Details](/assets/img/noderun9.png)  
10. Click **Authentication** to change to the second tab  
![Click authentication](/assets/img/noderun10.png)  
11. Enter the correct value for **Username** and click the **Select** button for SSH key storage path  
![Username and Path](/assets/img/noderun11.png)  
12. Choose the project as a key location by clicking the Projects menu and then select the box next to testkey  
![Choose Project](/assets/img/noderun12.png)  
13. Once the key has been selected, the screen will update and then you can click the green **Save** button at the bottom of the screen  
![Save](/assets/img/noderun13.png)  
14. Click the **Add Node** button to save these changes and complete this process  
![Add Node](/assets/img/noderun14.png)  
15. Click **Save** at the bottom of the Edit Nodes screen  
![Save](/assets/img/noderun15.png)  

## Add Runner tag to job

The last piece of setup is to configure a job to use our Runner to connect to your test node  

16. Click **Jobs** from the left-hand menu  
![Select Jobs](/assets/img/noderun16.png)  
17. On the All Jobs screen, click **>** next to **Linux** to open the Linux Job Group  
![Open Linux Job Group](/assets/img/noderun17.png)  
18. Access the Gather Linux Versions job by clicking the job name in the list  
![Gather Linux Versions](/assets/img/noderun18.png)  
19. Edit the job by clicking the **Actions** button at the right and then selecting **Edit this Job**  
![Edit Job](/assets/img/noderun19.png)  
20. To access information about connecting to nodes for this job, click **Nodes & Runners** to select the tab  
![Nodes and Runners](/assets/img/noderun20.png)  
21. Click on the menu next to Runner Set (current value Local Runner)  
![Runner Set](/assets/img/noderun21.png)  
22. Select **Enter a Tag Filter**  
![Tag Filter](/assets/img/noderun22.png)  
23. Below **Enter a Tab Filter**, enter **welcome** as a tag (as we set on the Runner earlier) and then click on Welcome Project runner to select it  
![Welcome tag](/assets/img/noderun23.png)  
24. Click Save at the bottom of the screen to save these changes  
![Save](/assets/img/noderun24.png)  
25. Run job against test node through Runner  
    Select **Change the Target Nodes** and **Select None**, then click Welcome to select testnode1 as the single target.  Click Run Job Now to run the job against that node.  
![Change node](/assets/img/noderun25.png)  
26. Click **>** next to **testnode1**  
![Get details](/assets/img/noderun26.png)  
27. Under testnode1, click **>** next to **Get Linux Version info** to display the results of this job  
![Display results](/assets/img/noderun27.png)  