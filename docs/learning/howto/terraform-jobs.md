# Use Terraform to manage Rundeck Jobs
Terraform is an open-source Infrastructure as Code (IaC) tool used in IT and DevOps to automate and manage the provisioning and configuration of infrastructure resources. It allows users to define their infrastructure in a declarative manner, specifying the desired state of resources, such as virtual machines, networks, and databases, in a configuration file.

Terraform then takes this configuration and interacts with cloud providers or on-premises infrastructure to create, modify, or delete resources to match the defined configuration. This approach makes it easy to version and manage infrastructure, collaborate with team members, and ensure consistency across different environments.

## What is a Terraform Provider?
A "provider" is a plugin that serves as an interface between Terraform and a specific infrastructure or service provider. Providers are essential components in Terraform because they enable the tool to interact with various cloud, virtualization, and other infrastructure platforms.

Each provider is responsible for translating the resource configurations defined in Terraform's HashiCorp Configuration Language (HCL) into API calls and actions that are specific to a particular provider's platform. This includes creating, updating, deleting, and managing resources within that platform. More information about providers [here](https://developer.hashicorp.com/terraform/language/providers/configuration).

## The Terraform Provider to manage a Rundeck instance
Rundeck Projects, Jobs, and Keys can be created and configured via Terraform using the Rundeck Terraform service. Terraform can handle Rundeck projects thanks to the project resource. In this guide, let's see how to manage Rundeck Jobs through Terraform by using the [Terraform Rundeck Provider](https://registry.terraform.io/providers/rundeck/rundeck/latest/docs).

## Requisites
1. Latest Terraform installed in your local computer, follow [this](https://developer.hashicorp.com/terraform/downloads) to learn how to install it. To see the version, execute `terraform -version`.
2. A local Rundeck instance. Check [this](https://docs.rundeck.com/docs/administration/install/) to learn how to install it.
3. Basic knowledge about Linux terminal usage.

:::tip
Though these instructions are written for the open source Rundeck application, they are also applicable for PagerDuty Process Automation.
:::

## Configuring the Rundeck Instance
The Rundeck Instance must be configured for access. To accomplish this, the objective is to create an API access token. In this example, the Rundeck instance is a local war based installation that runs in the `/opt/` directory.

1. Launch the Rundeck instance and login as `admin` user. The Rundeck instance is available at http://localhost:4440  
![](/assets/img/tf-jobs1.png)  
2. Click the user icon (upper right) and then click on "Profile.”  
![](/assets/img/tf-jobs2.png)  
3. Click "+" icon (next to "User API Tokens").  
![](/assets/img/tf-jobs3.png)  
4. Give the token a name such as "Terraform API Token" and then click on the green "Generate New Token" button.  
![](/assets/img/tf-jobs4.png)  
5. Save the token content to use later in the Terraform file definition (next section).  

## Configuring the Terraform Provider environment
1. Create a local directory in which to install the Provider and work.
2. Create an empty file called `rundeck.tf` now. This file must include information on the Terraform provider in the first area, rundeck instance information in the second section, and the desired actions in JSON format.
3. In this `rundeck.tf` file add the provider data:

	```
	terraform {
	 required_providers {
	   rundeck = {
	     source  = "rundeck/rundeck"
	     version = "0.4.7"
	   }
	 }
	}
	```  

	This enables Terraform to use the Rundeck service. The `version` attribute refers to the provider version (0.4.7, which is the most recent at the time of writing this how-to).  
4. In the `rundeck.tf` file, add the Rundeck instance resource block:  

	```
	provider "rundeck" {
	 url         = "http://localhost:4440/"
	 api_version = "45"
	 auth_token  = "your_token"
	}
	```

	The Rundeck instance token from the previous section is referred to as `auth_token` attribute, and the Rundeck instance url, `url`, in this case points to a local instance (`http://localhost:4440`). The latest Rundeck API version at the moment of writing this how-to is 45.
5. Now, let's add a new Rundeck Project resource:

	```
	resource "rundeck_project" "terraform" {
	   name        = "terraform"
	   description = "Sample Application Created by Terraform Plan"
	
	   resource_model_source {
	       type = "file"
	       config = {
	           format = "resourcexml"
	           file = "/opt/rundeck/resources.xml"
	           writable = "true"
	           generateFileAutomatically = "false"
	     ssh_authentication_type = "password"
	       }
	   }
	
	   extra_config = {
	       "project.label" = "Terraform Example"
	   }
	}
	```

The `file` attribute is associated with the Rundeck server file path of the model source, which in this case is `/opt/rundeck/resources.xml`. The `resources.xml` file includes a remote node example, as follows:

```
<?xml version="1.0" encoding="UTF-8"?>
<project>
  <node name="node00" 
   description="Node 00" 
   tags="" 
   hostname="192.168.56.20" 
   osArch="amd64" 
   osFamily="unix" 
   osName="Linux" 
   osVersion="5.14.0-284.30.1.el9_2.x86_64" 
   username="remote_username"
   ssh-authentication="password"
  ssh-password-storage-path="keys/mypasswd" />
</project>
```

6. Next, we can add a job resource to the `rundeck.tf` as follows:

	```
	resource "rundeck_job" "bounceweb" {
	   name              = "HelloWorldTerraform"
	   project_name      = "${rundeck_project.terraform.name}"
	   node_filter_query = "name: node.*"
	   description       = "Hello World from the Terraform Rundeck Provider"
	
	   command {
	       shell_command  = "whoami"
	   }
	}
	```

	The `node_filter_query` represents the job node filter and the `command` section expresses the Rundeck jobs steps.
7. Now let's add the password  resource. Add the following block to the `rundeck.tf` file:

	```
	resource "rundeck_password" "terraform" {
	  path         = "passwd"
	  password = "my_password"
	}
	
	```

8. And the ACL resource block:

	```
	data "local_file" "acl" {
	   filename = "${path.cwd}/user.yaml"
	}
	
	resource "rundeck_acl_policy" "example" {
	   name = "ExampleAcl.aclpolicy"
	   policy = "${data.local_file.acl.content}"
	}
	```  
	
	This block requires a file in the terraform working directory named `user.yaml` (referred to in the `filename` attribute); the example used in this how-to is the following one:

	```
	description: desc.
	context:
	 project: '.*'
	for:
	 resource:
	   - allow: '*'
	 adhoc:
	   - allow: '*'
	 job:
	   - allow: '*'
	 node:
	   - allow: '*'
	by:
	 group: user
	---
	description: desc.
	context:
	 application: 'rundeck'
	for:
	 resource:
	   - allow: '*'
	 project:
	   - allow: '*'
	 project_acl:
	   - allow: '*'
	 storage:
	   - allow: '*'
	by:
	 group: user
	```

This is the full `rundeck.tf` content:

```
terraform {
   required_providers {
       rundeck = {
         source  = "rundeck/rundeck"
         version = "0.4.7"
       }
   }
}

provider "rundeck" {
   url         = "http://localhost:4440/"
   api_version = "45"
   auth_token  = "your_rundeck_auth_token"
}

resource "rundeck_project" "terraform" {
   name        = "terraform"
   description = "Sample Application Created by Terraform Plan"
   resource_model_source {
       type = "file"
       config = {
           format = "resourcexml"
           file = "/opt/rundeck/resources.xml"
           writable = "true"
           generateFileAutomatically = "false"
           ssh_authentication_type = "password"
       }
   }
   extra_config = {
       "project.label" = "Terraform Example"
   }
}

resource "rundeck_job" "bounceweb" {
   name              = "HelloWorldTerraform"
   project_name      = "${rundeck_project.terraform.name}"
   node_filter_query = "name: node.*"
   description       = "Hello World from the Terraform Rundeck Provider"
   command {
       shell_command  = "whoami"
   }
}

resource "rundeck_password" "terraform" {
 path         = "passwd"
 password = "vagrant"
}

data "local_file" "acl" {
   filename = "${path.cwd}/user.yaml"
}

resource "rundeck_acl_policy" "example" {
   name = "ExampleAcl.aclpolicy"
   policy = "${data.local_file.acl.content}"
}
```

## Testing the Terraform Provider against the Rundeck Instance
To make sure the Rundeck instance and Terraform Provider are configured correctly, a preliminary test is required. The steps to accomplish this are as follows:  
1. The first step is to validate our `rundeck.tf` definition. If you type the `terraform validate` command, you will see the following output:  

	```
	Success! The configuration is valid.
	```

You can learn more about the `terraform validate` command [here](https://developer.hashicorp.com/terraform/cli/commands/validate).  
2. Run the `terraform init` command. The provider is downloaded to your working directory with this operation. This is what you will get as an output:

```
Initializing the backend...

Initializing provider plugins...
- Finding rundeck/rundeck versions matching "0.4.7"...
- Finding latest version of hashicorp/local...
- Installing rundeck/rundeck v0.4.7...
- Installed rundeck/rundeck v0.4.7 (self-signed, key ID 363DB95DA1D090AA)
- Installing hashicorp/local v2.4.0...
- Installed hashicorp/local v2.4.0 (signed by HashiCorp)

Partner and community providers are signed by their developers.
If you'd like to know more about provider signing, you can read about it here:
https://www.terraform.io/docs/cli/plugins/signing.html

Terraform has created a lock file .terraform.lock.hcl to record the provider selections it made above. Include this file in your version control repository so that Terraform can guarantee to make the same selections by default when you run "terraform init" in the future.

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see any changes that are required for your infrastructure. All Terraform commands should now work.

If you ever set or change modules or backend configuration for Terraform, rerun this command to reinitialize your working directory. If you forget, other commands will detect it and remind you to do so if necessary.
```

You can learn more about the `terraform init` command [here](https://developer.hashicorp.com/terraform/cli/commands/init).  <br>
3. Now let's test the `rundeck.tf` definition. To do so, execute the `terraform plan` command. You will see all the elements to apply to your instance.  
	Essentially, this is a simulation of what would happen if we decided to make these modifications to our Rundeck instance (see the following section). More information regarding the `terraform plan` command may be found [here](https://developer.hashicorp.com/terraform/cli/commands/plan).

## Creating a Rundeck Project and Job via Terraform
1. Execute the `terraform apply` command to see the same `terraform plan` verification. You will be prompted to confirm application of these changes.

	```
	Do you want to perform these actions?
	 Terraform will perform the actions described above.
	 Only 'yes' will be accepted to approve.
	
	```

2. Type `yes` and press the Enter key. The Rundeck project, including the sample task, has been built.
3. You may use the `terraform show` command to check the current status of this implementation.
4. In your web browser, navigate to the Rundeck instance. The project, job, key, and ACL are all present.  
![](/assets/img/tf-jobs5.png)  

## Rolling back
When we need to undo all modifications, we can accomplish it by following these procedures.  
1. In the working directory created in the first section, type `terraform destroy` to undo all changes made to the Instance.
	Type `yes` and press the "Enter" key to confirm.

	```
	rundeck_acl_policy.example: Destroying... [id=ExampleAcl.aclpolicy]
	rundeck_password.terraform: Destroying... [id=passwd]
	rundeck_job.bounceweb: Destroying... [id=acb1685c-6940-4818-bf60-ec6c027552cd]
	rundeck_password.terraform: Destruction complete after 0s
	rundeck_acl_policy.example: Destruction complete after 0s
	rundeck_job.bounceweb: Destruction complete after 0s
	rundeck_project.terraform: Destroying... [id=terraform]
	rundeck_project.terraform: Destruction complete after 0s
	```

## Resources
* [Terraform documentation](https://developer.hashicorp.com/terraform?product_intent=terraform).
* [Rundeck documentation](https://docs.rundeck.com/docs/).
* [Terraform Rundeck Provider](https://registry.terraform.io/providers/rundeck/rundeck/latest/docs).
* [Terraform Rundeck Provider GitHub space](https://github.com/rundeck/terraform-provider-rundeck).