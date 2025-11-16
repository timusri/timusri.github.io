---
title: "K8s microservice monitoring using Prometheus and Grafana"
date: "2021-03-27"
tags: ["kubernetes", "prometheus", "grafana", "monitoring", "redis", "observability"]
description: "Learn how to monitor Kubernetes microservices using Prometheus meta labels and Grafana dashboards with Redis as a practical example, including fine-grained scraping control."
author: "Sumit Srivastava"
externalUrl: "https://timusri.medium.com/k8s-microservice-monitoring-using-prometheus-and-grafana-106d0397b01b"
---

# K8s microservice monitoring using Prometheus and Grafana

Published in **FAUN.dev()** 🐾 | 3 min read

This article covers:
- Deploying applications with exposed Prometheus metrics
- Using Redis exporter in multi-container pods
- Configuring Prometheus scraping with kubernetes_sd_configs
- Setting up Grafana dashboards for per-pod monitoring
- Prometheus annotations for fine control of scraping
- Configuring data sources and alerts

**Key Annotations:**
- `prometheus.io/scrape` - Control scraping process
- `prometheus.io/path` - Define custom metrics path
- `prometheus.io/port` - Specify scraping port

Complete working code available on [GitHub](https://github.com/timusri/k8s_pod_monitoring).

Read the full article on Medium.

