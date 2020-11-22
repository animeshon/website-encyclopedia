terraform {
  backend "remote" {
    hostname = "app.terraform.io"
    organization = "animeshon"

    workspaces {
      prefix = "website-encyclopedia-"
    }
  }
}

data "terraform_remote_state" "root" {
  backend = "remote"

  config = {
    hostname = "app.terraform.io"
    organization = "animeshon"

    workspaces = {
      name = "master"
    }
  }
}

data "terraform_remote_state" "general" {
  backend = "remote"

  config = {
    hostname = "app.terraform.io"
    organization = "animeshon"

    workspaces = {
      name = "general-tier-0"
    }
  }
}