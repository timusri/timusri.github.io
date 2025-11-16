---
title: "How do we calculate the IOPS of AWS gp2 type volume?"
date: "2024-04-02"
tags: ["aws", "iops", "rds", "gp2", "storage", "performance"]
description: "Understand how to calculate and optimize IOPS for AWS gp2 volumes, including baseline performance, burst capabilities, and credit management for effective storage performance."
author: "Sumit Srivastava"
externalUrl: "https://timusri.medium.com/how-do-we-calculate-the-iops-of-aws-gp2-type-volume-289f365649a2"
---

# How do we calculate the IOPS of AWS gp2 type volume?

2 min read

This article covers:
- Understanding gp2 baseline performance (3 IOPS per GB)
- Burst capability up to 3,000 IOPS
- Burst credit system and replenishment rates
- Performance calculations for volumes under 1TB
- Performance calculations for volumes over 1TB
- IOPS utilization best practices

**Key Metrics:**
- **Baseline**: 3 IOPS per GB (minimum 100 IOPS)
- **Burst**: Up to 3,000 IOPS for ~30 minutes
- **Replenishment**: ~5 hours to fully replenish
- **Average Utilization**: Don't exceed 330 IOPS for <1TB volumes

**Critical for:**
- Optimizing RDS performance
- Avoiding burst credit depletion
- Right-sizing storage volumes
- Cost optimization

Read the full article on Medium.

