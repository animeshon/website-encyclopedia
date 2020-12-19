terraform {
  backend "remote" {
    hostname = "app.terraform.io"
    organization = "animeshon"

    workspaces {
      prefix = "website-encyclopedia-"
    }
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 3.50"
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

locals {
  project_id     = data.terraform_remote_state.general.outputs.project_id
  project_number = data.terraform_remote_state.general.outputs.project_number

  sa_compute_email = data.terraform_remote_state.general.outputs.google_compute_default_service_account_email
}
