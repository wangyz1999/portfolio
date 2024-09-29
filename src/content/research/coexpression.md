---
title: "Human-Robot Facial Co-expression"

feature: "/imgs/projects/coexpress.gif"
description: Science Robotics 2024

publishDate: "02 Jan 2023"
authors:
  [
    "Yuhang Hu",
    "Boyuan Chen",
    "Jiong Lin",
    "Yunzhe Wang",
    "Yingke Wang",
    "Cameron Mehlman",
    "Hod Lipson",
  ]

author_idx: 3
selected: true
links:
  Paper: "https://www.science.org/doi/10.1126/scirobotics.adi4724"
  Code: "https://github.com/H-Y-H-Y-H/HR_Facial_Coexpression"
---

## Human-Robot Facial Co-expression

Large language models like ChatGPT have helped us to make great strides in improving how robots talk, but their ability to communicate non-verbally, particularly through facial expressions, hasn't improved as much. Basically, there are two main issues here:

1. \> Firstly, creating a robot face that can make a wide variety of expressions is quite difficult from an engineering standpoint.

2. \> Secondly, knowing when and how to make a particular facial expression so it looks natural and sincere is another challenge.

We believe we can overcome these issues by training a robot to predict and mimic human facial expressions at the same time as the human makes them. While a delayed reaction might look fake, matching the human's facial expression in real time can appear more authentic because it needs the robot to accurately guess the human's emotional state at that moment.

In fact, we've found that a robot can predict a person's smile almost 0.7 seconds before they actually smile. By using a method that allows the robot to understand its own facial structure and movement, the robot can also start to smile at the same time as the human.

## My Contribution

I designed and implemented algorithms in several areas such as facial landmark extraction and normalization, conversion of facial features from a human distribution to a robot distribution, and training of a landmark-based inverse model. These same algorithms were equally utilized in the project involving lip-synchronization for the robotic face.
