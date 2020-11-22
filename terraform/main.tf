provider "google" {
  version = "~> 3.31"
}

locals {
  project_id     = data.terraform_remote_state.general.outputs.project_id
  project_number = data.terraform_remote_state.general.outputs.project_number

  sa_compute_email = data.terraform_remote_state.general.outputs.google_compute_default_service_account_email
}
