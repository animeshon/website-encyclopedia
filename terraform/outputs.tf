output "service_id" {
  value = data.google_cloud_run_service.encyclopedia.id
}

output "service_name" {
  value = data.google_cloud_run_service.encyclopedia.name
}
