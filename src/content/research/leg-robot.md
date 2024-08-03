---
title: "Robot Configuration Identification from Motion Data"

feature: "/imgs/projects/identification.gif"
description: Submitted to 2024 IEEE International Conference on Robotics and Automation (ICRA2024)

publishDate: "09 Jun 2023"
authors: ["Yuhang Hu", "Yunzhe Wang", "Ruibo Liu", "Zhou Shen", "Hod Lipson"]

author_idx: 1

links:
  Overview: "/research/leg-robot"
  Code: "https://github.com/H-Y-H-Y-H/meta_real"
---

## Robot Configuration Identification from Motion Data

The ability to create a long-term body self-image through movement is natural for humans: we can perceive the position, orientation and motion of our body parts without seeing and thinking, thanks to proprioceptors located within muscles, tendons, skin and joints. Such spatial self-awareness is also essential for robots to anticipate outcomes of motor action without trying them out in physical reality.

In this study, we want to know if is it possible to reconstruct the topology of a robot simply by looking at the motion dynamics of its center of mass? The strategy employed in this study bears a resemblance to Biometric Motion Identification in human studies, where individuals can be distinguished based on motion capture data obtained from kinetic videos and 3D skeletal sequences.

The ability of robots to self-identify their configuration is significant in generalist robotics. For instance, in self-modeling robots, a robot can reconstruct an internal representation of its physical properties through computational models. This capability leads to improved machine resilience by enabling the robot to adapt to damages, leading to profound application in space exploration robots where the cost of repair and redeploy is high.

## My Contribution

I worked on the machine learning part of the project.

- \> Developed a data collection schema that led to the generation and collection of 280K distinct robot configurations, each paired with kinematic data
- \> Devised and implemented neural network architectures in line with data assumptions. These included PointNet, SetTransformer, CNN, and LSTM. Notably, the results demonstrated that a CNN-LSTM hybrid approach, which leveraged time and channel-wise dependencies, yielded superior results when viewing motion dynamics as multi-variate timeseries.

## Lessons Learned

- \> The efficacy of neural network architecture is significantly influenced by the underlying data assumptions. Progress was notably amplified when data was approached as a time series.
- \> After establishing data assumptions and modalities, utilizing state-of-the-art encoder architectures as a baseline accelerates idea verification and performance evaluation.
- \> Training Data and Real-World Data Can Diverge: Models trained on robot simulation datasets might perform poorly on real-world physical robot due to "data distribution shift". Adaption techniques are needed to tackle this issue.
- \> Various machine learning pachages such as PyTorch Lightning, WandB are created to shorten development and experimentation cycles through automated hyperparameter optimization and auto experiemnt tracking.
