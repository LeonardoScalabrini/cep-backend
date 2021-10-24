terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.53"
    }
  }
  backend "remote" {
    organization = "leonardo-scalabrini"
    workspaces {
      name = "cep-backend"
    }
  }
}

provider "google" {
  credentials = var.cloud_credential

  project = var.project_id
  region  = var.region
  zone    = var.zone
}

resource "google_project_service" "run_api" {
  service = "run.googleapis.com"
}

resource "google_cloud_run_service" "cep-backend" {
  name     = "cep-backend"
  location = var.region

  template {
    spec {
      containers {
        image = var.image
        env {
          name = "STRING_CONNECTION_DB"
        }
      }
    }
  }

  autogenerate_revision_name = true

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_project_service.run_api]

  lifecycle {
    ignore_changes = [template.0.spec.0.containers.0.image]
  }
}

resource "google_cloud_run_service_iam_member" "run_all_users" {
  service  = google_cloud_run_service.cep-backend.name
  location = google_cloud_run_service.cep-backend.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

output "service_url" {
  value = google_cloud_run_service.cep-backend.status[0].url
}