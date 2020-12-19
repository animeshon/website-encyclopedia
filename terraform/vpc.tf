resource "google_compute_network" "graphql_network" {
  name = "run--graphql-network"

  auto_create_subnetworks = false
  routing_mode            = "REGIONAL"
}

resource "google_compute_subnetwork" "graphql_subnet" {
  name = "run--graphql-subnet"

  ip_cidr_range = "10.10.0.0/20"
  network       = google_vpc_access_connector.graphql_vpc.network
  region        = google_vpc_access_connector.graphql_vpc.region
}

resource "google_compute_router" "graphql_router" {
  name = "run--graphql-router"

  region  = google_compute_subnetwork.graphql_subnet.region
  network = google_compute_network.graphql_network.id
}

resource "google_vpc_access_connector" "graphql_vpc" {
  name = "run--graphql-vpc"

  ip_cidr_range = "10.8.0.0/28"
  region        = "europe-west1"
  network       = google_compute_network.graphql_network.name
}

resource "google_compute_address" "graphql_ip_address" {
  name   = "run--graphql-outbound-ip-address"
  region = google_vpc_access_connector.graphql_vpc.region
}

resource "google_compute_router_nat" "graphql_router_nat" {
  name = "run--graphql-router-nat"

  router                             = google_compute_router.graphql_router.name
  region                             = google_compute_router.graphql_router.region
  nat_ip_allocate_option             = "MANUAL_ONLY"
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"
  nat_ips                            = [google_compute_address.graphql_ip_address.self_link]
}
