---
title: "How to configure gcloud on macOS with M1"
date: "2024-04-16"
tags: ["gcp", "gcloud", "macos", "m1", "terminal", "cloud", "setup"]
description: "Step-by-step guide to installing and configuring the gcloud CLI on macOS with M1 chip, including SDK installation, authentication, and PATH configuration."
author: "Sumit Srivastava"
externalUrl: "https://timusri.medium.com/how-to-configure-gcloud-on-macos-with-m1-5e8f534176f6"
---

# How to configure gcloud on macOS with M1

2 min read

This article covers:
- Installing Google Cloud SDK on M1 Mac
- Extracting and initializing the gcloud CLI
- Authentication methods (interactive and service account)
- Selecting default project and compute zone
- Adding gcloud to PATH environment variable
- Verifying installation and configuration

**Installation Steps:**
1. Download and extract Google Cloud SDK
2. Initialize with `gcloud init`
3. Authorize and select project
4. Configure default compute zone
5. Add to PATH for system-wide access
6. Test with `gcloud info`

**Authentication Options:**
- Interactive: `gcloud init`
- Console-only: `gcloud init --console-only`
- Service Account: `gcloud auth activate-service-account`

Essential guide for M1 Mac users working with Google Cloud Platform.

Read the full article on Medium.

