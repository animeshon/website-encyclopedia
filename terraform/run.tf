
# NOTE: A new id is generated each time we switch to a new image tag.
resource "random_id" "encyclopedia" {
  keepers = {
    image_tag = var.image_tag
  }

  byte_length = 8
}

resource "google_cloud_run_service" "encyclopedia" {
  project  = local.project_id
  location = "europe-west1"
  name     = "animeshon-com-e"

  template {
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale" = "5"
        "run.googleapis.com/client-name"   = "cloud-console"
      }
      name = format("animeshon-com-e-%s", random_id.encyclopedia.hex) 
    }

    spec {
      container_concurrency = 80
      service_account_name  = local.sa_compute_email

      containers {
        image = format("gcr.io/gcp-animeshon-general/animeshon-com-e:%s", var.image_tag)

        env {
          name  = "HOST"
          value = "animeshon.com"
        }

        env {
          name  = "WEBSITE_NAME"
          value = "Animeshon Encyclopedia"
        }

        env {
          name  = "WEBSITE_BASEURL"
          value = "https://animeshon.com/e"
        }

        env {
          name  = "NEXTJS_ASSET_PREFIX"
          value = "/e"
        }

        env {
          name  = "GRAPHQL_ENDPOINT"
          value = "https://api.animeshon.com/graphql"
        }

        env {
          name  = "GTM_TRACKING_ID"
          value = "GTM-NRN5LVP"
        }

        env {
          name  = "NODE_ENV"
          value = "production"
        }

        resources {
          limits = {
            cpu    = "1000m"
            memory = "256Mi"
          }
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

# Allow everyone to access this instance from encyclopedia.animeshon.com.
data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "encyclopedia" {
  project  = google_cloud_run_service.encyclopedia.project
  location = google_cloud_run_service.encyclopedia.location
  service  = google_cloud_run_service.encyclopedia.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
