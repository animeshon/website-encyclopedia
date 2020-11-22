# Setup the backend service  with Cloud CDN enabled.
resource "google_compute_backend_service" "encyclopedia" {
  name        = "animeshon-com--encyclopedia"
  enable_cdn  = true

  backend {
    group = google_compute_region_network_endpoint_group.encyclopedia.id
  }
}

# NEG for the serverless Cloud Run instance.
resource "google_compute_region_network_endpoint_group" "encyclopedia" {
  name                  = "encyclopedia-neg"
  network_endpoint_type = "SERVERLESS"
  region                = google_cloud_run_service.encyclopedia.location

  cloud_run {
    service = google_cloud_run_service.encyclopedia.name
  }
}
