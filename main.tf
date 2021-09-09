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

resource "google_compute_network" "vpc_network" {
  name = "terraform-network"
}

resource "google_compute_address" "static" {
  name = "ipv4-address"
}

data "google_compute_image" "container-optimized-image" {
  family = "cos-81-lts"
  project = "cos-cloud"
}

module "gce-container" {
  source = "github.com/terraform-google-modules/terraform-google-container-vm"

  container = {
    image = var.image
  }

  restart_policy = "Always"
}

resource "google_compute_instance" "instance_with_ip" {
  name         = var.name
  machine_type = "f1-micro"
  zone         = var.zone
  tags = ["http-server"]
  metadata_startup_script = var.startup_script

  metadata = {
    gce-container-declaration = module.gce-container.metadata_value
    google-logging-enabled    = "true"
    google-monitoring-enabled = "true"
  }

  boot_disk {
    initialize_params {
      image = data.google_compute_image.container-optimized-image.self_link
    }
  }

  network_interface {
    network = "default"
    access_config {
      nat_ip = google_compute_address.static.address
    }
  }
}
