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

variable "name" {
  type = string
}
variable "project_id" {
  type = string
}
variable "region" {
  type = string
}
variable "zone" {
  type = string
}
variable "image" {
  type = string
}
variable "startup_script" {
  type = string
}
variable "cloud_credential" {
  type = string
}

provider "google" {
  credentials = var.cloud_credential

  project = var.project_id
  region  = var.region
  zone    = var.zone
}

resource "google_cloud_run_service" "default" {
  name     = "cloudrun-srv"
  location = var.zone

  template {
    spec {
      containers {
        image = var.image
        containerPort = 80
      }
    }
  }

  traffic {
    percent = 100
    latest_revision = true
  }
}
