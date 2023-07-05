---
title: "Lip Synchronization for Animatronic Robot Face"

feature: "/imgs/projects/lip-sync.gif"
description: In Preparation

publishDate: "02 Jun 2022"
authors: ["Yuhang Hu", "Yunzhe Wang", "Boyuan Chen", "Yingke Wang", "Jiong Lin", "Hod Lipson"]

author_idx: 1

links: 
    Overview: "/research/lip-sync"
---

## Lip Synchronization for Animatronic Robot Face

Artificial Intelligence Generated Content (AIGC) technologies such as Large Language Model, Voice Synthesis, and Talking Facial Avatar Generation has gained huge attention in recent years. Such technology, incorporating with speech recognition, enabled a automatic conversation pipeline for human-computer interaction: Human->Speech->Trinscribed Text->Text Response from Language Model->Synthesized Speech->Animate Virtual Character->Human. 

Nonetheless, merging such capability in virtual characters to physical robot faces changes from both software and hardware perspective. 

## My Contribution

- \> End-to-end and from scratch development of a speech-driven landmark-based talking face generation model. Gone through three itearations of architecture immplementation.

- \> Algorithm design and application such as facial landmark extraction, landmark normalization, head pose estimation, speech synthesis, domain adaptaion from human to robot, and landmark based inverse model.


## Lesson Learned

In my first attempt to develop machine learning models from scratch in research, I learned several key lessons:

- \> Developing deep learning models from scratch is a great learning process, giving detailed insights into their structure and workings. However, when venturing into well-researched areas, it's usually more effective to use existing cutting-edge models as a baseline and strive for enhancement, rather than starting from scratch.

- \> Compute Resources Are a Bottleneck: My early endeavors in model training were hindered by limited computing resources, specifically Google Colab and a portable RTX2060 version. Such limitations often hinder data acquisition, processing, and the training of models.

- \> Data Quality is Critical: The relevance and quality of the data used in training can often outweight the sheer volume of data or the intricacy of the algorithms implemented. Experiments initially employed the noisy VoxCeleb2 wild speech videos, but it was later found that a carefully selected dataset of a single speaker, combined with a well-trained speech embedding model, yielded more satisfactory results.



## Current Status

Due to hardware limitations and lack of degree of freedom of mouth module, the current robot motor cannot keep up with the real-time generated lip-synced facial expression and were unable to authentically make certain lips motion. A renouned journel submission is expected after resolving such hardware issues.