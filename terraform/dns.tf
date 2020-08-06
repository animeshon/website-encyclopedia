locals {
  zone_project_id = data.terraform_remote_state.root.outputs.project_id
  zone_dns_name   = data.terraform_remote_state.root.outputs.managed_zone_animeshon_com_dns_name
  zone_name       = data.terraform_remote_state.root.outputs.managed_zone_animeshon_com_name
}

# Setup global ingress ip address for the "insider" subdomain.
resource "google_compute_global_address" "insider" {
  name = "insider-animeshon-com"
}

# Setup "source" subdomain DNS record.
resource "google_dns_record_set" "insider" {
  project      = local.zone_project_id
  name         = "insider.${local.zone_dns_name}"
  managed_zone = local.zone_name
  type         = "A"
  ttl          = 300

  rrdatas = [
    google_compute_global_address.insider.address,
  ]
}
