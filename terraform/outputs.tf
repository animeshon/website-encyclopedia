output "backend_service_id" {
  value = google_cloud_run_service.encyclopedia.id
}
output "backend_service_name" {
  value = google_cloud_run_service.encyclopedia.name
}
