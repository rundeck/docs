# Use Terraform to Automate Rundeck

Terraform (and everything) is awesome...


## Pre-Requisites

- This Exercise is build based on the Welcome Projects.  Please ensure you have completed the tutorial and have that environment running.
- [Terraform must be installed](https://learn.hashicorp.com/tutorials/terraform/install-cli) on your local machine. Confirm with `terraform -version`.  Latest version as of writing is _1.0.3_.
- General understanding of using your computers terminal program.

## Exercise

:::: tabs
::: tab Terraform Exercise 1

1. Create a working directory on your machine for this exercise.
1. Copy the contents from the **Terraform Plan File** tab to a file called `rundeck-build.tf` in your working directory.
1. Copy the contents from the **ACL Example File** tab to a file called `acl.yaml` in your working directory.
1. In your computer's terminal program navigate to your working directory.
1. Execute the command `terraform init`
1. Execute the command `terraform apply`
1. Type `yes` to confirm the changes

The following items will have been added to your Welcome Project
- A new Project called "Terraform Example"
- Two entries in the Key Storage under the "terraform" folder
- A new ACL Entry that would allow any one in the "terraform" group full access to this project and read access to others.  (Note: The group is not created, but for extra credit give it a try!)

:::
::: tab Terraform Exercise 2
> This requires a success with Exercise 1

To see the power of managing Rundeck Projects with Terraform we can make some minor adjustments to the Plan File and apply those changes.

1. On line 31 of the _rundeck-build.tf_ file change the `"project.label" = "Terraform Example"` to `"project.label" = "My Terraform Example"`
1. Execute the command `terraform apply`
1. Type `yes` to confirm the changes

The project will be updated with a new Label value.  To confirm click the Rundeck logo in the upper left of the interface to load the project list.

:::
::: tab Terraform Plan File

```
terraform {
  required_providers {
    rundeck = {
      source  = "rundeck/rundeck"
      version = "0.4.2"
    }
  }
}

provider "rundeck" {
  url         = "http://localhost:4440/"
  api_version = "38"
  auth_token  = "your-auth-token"
}

resource "rundeck_project" "terraform" {
  name        = "terraform"
  description = "Sample Application Created by Terraform Plan"
  ssh_key_storage_path = "${rundeck_private_key.terraform.path}"
  resource_model_source {
    type = "file"
    config = {
      format = "resourcexml"
      # This path is interpreted on the Rundeck server.
      file = "/home/rundeck/resources.xml"
      writable = "true"
      generateFileAutomatically = "true"
    }
  }
  extra_config = {
    "project.label" = "Terraform Example"
  }
}

resource "rundeck_job" "bounceweb" {
  name              = "Bounce All Web Servers"
  project_name      = "${rundeck_project.terraform.name}"
  node_filter_query = "tags: web"
  description       = "Restart the service daemons on all the web servers"

  command {
    shell_command = "sudo service anvils restart"
  }
}

resource "rundeck_public_key" "terraform" {
  path         = "terraform/id_rsa.pub"
  key_material = "ssh-rsa yada-yada-yada"
}

resource "rundeck_private_key" "terraform" {
  path         = "terraform/id_rsa"
  key_material = "$${file(\"id_rsa.pub\")}"
}

data "local_file" "acl" {
  filename = "${path.cwd}/acl.yaml"
}

resource "rundeck_acl_policy" "example" {
  name = "ExampleAcl.aclpolicy"

  policy = "${data.local_file.acl.content}"
}

```
:::
::: tab ACL Example File
```
by:
  group: terraform
description: Allow terraform Key Storage Access
for:
  storage:
  - allow:
    - read
context:
  application: rundeck
---
by:
  group: terraform
description: Allow Terraform Group [read] for all projects
for:
  project:
  - allow:
    - read
context:
  application: rundeck
---
by:
  group: terraform
description: Terraform Project Full Admin
for:
  project:
  - allow:
    - admin
    match:
      name: terraform
context:
  application: rundeck
```

:::
