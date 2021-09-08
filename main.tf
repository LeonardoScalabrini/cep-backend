terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.53"
    }
  }
}

variable "project_id" {
  type = string
}

variable "private_key_id" {
  type = string
}

variable "private_key" {
  type = string
}

variable "client_email" {
  type = string
}

variable "client_id" {
  type = string
}

variable "client_x509_cert_url" {
  type = string
}

provider "google" {
  credentials = {
    "type": "service_account",
    "project_id": var.project_id,
    "private_key_id": var.private_key_id,
    "private_key": var.private_key,
    "client_email": var.client_email,
    "client_id": var.client_id,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": var.client_x509_cert_url
  }

  project = "ecstatic-bounty-323023"
  region  = "us-central1"
  zone    = "us-central1-c"
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
    image = "gcr.io/ecstatic-bounty-323023/cep-backend:v1.0"
  }

  restart_policy = "Always"
}

resource "google_compute_instance" "instance_with_ip" {
  name         = "vm-instance"
  machine_type = "f1-micro"
  zone         = "us-central1-a"
  tags = ["http-server"]
  metadata_startup_script = "echo hi > /test.txt"

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
