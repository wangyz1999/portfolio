---
title: "A Simple Guide to Elastic Weight Consolidation"
publishDate: "01 May 2023"
description: "A Practical Approach to Continual Learning with Neural Networks"
tags: ["AI", "ML"]
---

## The Problem of Catastrophic Forgetting

In the field of artificial intelligence, deep learning models, especially neural networks, have shown great success in a wide range of applications. However, one major challenge these models face is the phenomenon of Catastrophic Forgetting. Catastrophic forgetting occurs when a neural network learns new tasks and, in the process, forgets previously learned tasks. This limitation hinders the development of lifelong learning systems or networks that require constant adaptation to new environments and tasks.

To counter Catastrophic forgetting, several methods have been proposed:

1. [Elastic Weight Consolidation (EWC)](https://www.pnas.org/doi/10.1073/pnas.1611835114): A regularization technique that adds a penalty term to the loss function based on the Fisher information matrix, constraining the learning process to retain the knowledge of previous tasks.

1. [Progressive Neural Networks (PNN)](https://arxiv.org/abs/1606.04671): An architecture that trains separate columns of neural networks for each task, with lateral connections to transfer previously learned knowledge to the new task without altering the previous networks.

1. [Learning without Forgetting (LwF)](https://arxiv.org/abs/1606.09282): A method that incorporates knowledge distillation to train the network on new tasks while preserving the output probabilities of the previous tasks, thus maintaining old knowledge.

1. [Continual Learning with Memory Replay (CLMR)](https://arxiv.org/abs/2108.12641): A technique that maintains a memory buffer of previously learned examples, which are periodically replayed along with new data to prevent forgetting.

1. [Sparse Coding](http://ufldl.stanford.edu/tutorial/unsupervised/SparseCoding/#:~:text=Sparse%20coding%20is%20a%20class,1ai%CF%95i): A representation learning method that enforces sparsity in the activations of the network, leading to more distinct and non-overlapping representations for different tasks, thereby reducing interference.

1. [Meta-Continual Learning:](https://arxiv.org/abs/1806.06928) An approach that leverages meta-learning algorithms, such as MAML, to learn a model-agnostic initialization that can quickly adapt to new tasks with minimal interference to previously learned tasks.

1. [Synaptic Intelligence (SI)](https://arxiv.org/abs/1703.04200): A regularization method that accumulates the importance of each weight over time during learning and uses this information to constrain weight updates, preserving the knowledge of previous tasks.

This tutorial explains Elastic Weight Consolidation, including its fundamental principles and how to apply it in PyTorch, a widely used deep learning framework. We'll also cover optimization techniques and examine several scenarios where EWC can be advantageous. With the knowledge gained from this tutorial, you'll be able to integrate EWC into your own projects and address the issue of catastrophic forgetting.

## Elastic Weight Consolidation

Elastic Weight Consolidation (EWC) is a regularization technique that mitigates catastrophic forgetting by constraining the learning process in neural networks. The key idea behind EWC is to add a quadratic penalty term to the standard loss function. This penalty term considers the distance between the current weight values and the optimal weights obtained during the previous task learning. By doing this, EWC reduces the interference between tasks and helps maintain a balance between learning new tasks and retaining old ones.

![Illustration of training trajectory for EWC (red), considering only task B (Blue) and constraining all weights uniformly (Green). [Kirkpatrick 2017](https://www.pnas.org/doi/10.1073/pnas.1611835114)](https://cdn-images-1.medium.com/max/2560/1*jisjhTM0TqPD1QyXUZdmuA.jpeg)_Illustration of training trajectory for EWC (red), considering only task B (Blue) and constraining all weights uniformly (Green). [Kirkpatrick 2017](https://www.pnas.org/doi/10.1073/pnas.1611835114)_

EWC facilitates retaining knowledge of task A while training on task B. The training process is depicted in a conceptual parameter space, where parameter regions resulting in a good performance on task A are represented in gray, and those for task B in cream color. After learning task A, the parameters are located at θ∗A.

If we only consider task B’s gradient steps (blue arrow), we minimize task B’s loss but compromise the knowledge acquired from task A. This corresponds to “no penalty” in the figure.

Conversely, if we constrain all weights uniformly (green arrow), the learning process corresponds to “l2” in the figure.

It turns out that the l2 constraint is so strong that it could hamper the learning process of task B. In neural networks, we often over-parametrize the models. **There might be some parameters that are less useful and others are more valuable**.

EWC discovers a solution for task B without significantly impairing task A’s performance (red arrow) by explicitly calculating the importance of each weight for task A. This importance value, called the Fisher information matrix, quantifies the weight’s contribution to the performance on previously learned tasks. The Fisher information matrix provides an approximation of the curvature of the loss function, giving us insight into how sensitive the network is to changes in the weights. Weights with higher importance values have a greater impact on the performance of the previous tasks, and thus, their updates should be constrained more during the learning of new tasks.

The EWC learning process can be formulated as follows:

Where:

- _I_i_ is the Fisher information matrix diagonal, representing the importance of each weight _i_

- λ is a scalar hyperparameter that controls the strength of the EWC penalty

When training the network on a new task, the EWC loss function combines the loss for the new task with the penalty term that restricts the updates on weights according to their importance values. This ensures that the learning process remains biased towards retaining previously learned knowledge while still adapting to the new task.

### Fisher Information Matrix (FIM)

The Fisher information matrix is calculated based on the second-order derivatives of the log-likelihood of the data given the model parameters.

EWC calculates the diagonal elements of the approximate Fisher Information Matrix. This series of approximations results in the diagonal being estimated as the squared gradients averaged across mini-batches during a single pass through the training dataset.

To calculate the Fisher diagonal _I_ for each weight _i_, follow these steps:

1. Train the model on the current task and obtain the optimal weights (θ^\*\_i) for that task.

1. Compute the gradients of the loss function with respect to each weight: ∇_θ_i L(θ)

1. Estimate the Fisher diagonal I*i for each weight as the squared expectation of the gradients: I_i = E[(∇*θ_i L(θ))²]

### PyTorch Implementation of EWC Loss

Assuming we have a neural network model trained on task A using dataset A, we now train it on task B. Below is a code snippet to obtain the EWC loss with empirical fisher.

```python
    def get_fisher_diag(model, dataset, params, empirical=True):
        fisher = {}
        for n, p in deepcopy(params).items():
            p.data.zero_()
            fisher[n] = Variable(p.data)

        model.eval()
        for input, gt_label in dataset:
            model.zero_grad()
            output = model(input).view(1, -1)
            if empirical:
                label = gt_label
            else:
                label = output.max(1)[1].view(-1)
            negloglikelihood = F.nll_loss(F.log_softmax(output, dim=1), label)
            negloglikelihood.backward()

            for n, p in model.named_parameters():
                fisher[n].data += p.grad.data ** 2 / len(dataset)

        fisher = {n: p for n, p in fisher.items()}
        return fisher

    def get_ewc_loss(model, fisher, p_old):
        loss = 0
        for n, p in model.named_parameters():
            _loss = fisher[n] * (p - p_old[n]) ** 2
            loss += _loss.sum()
        return loss

    model = model_trained_on_task_A
    dataset = a_small_sample_from_dataset_A
    params = {n: p for n, p in model.named_parameters() if p.requires_grad}
    p_old = {}

    for n, p in deepcopy(params).items():
        p_old[n] = Variable(p.data)

    fisher_matrix = get_fisher_diag(model, dataset, params)
    ewc_loss = get_ewc_loss(model, fisher_matrix, p_old)
```

Some Comments:

1. The dataset used for computing FIM can be a small sample from task1

1. When computing the NLL loss, we can either use the ground truth label or the predicted label. Both give the fisher information. When using the ground truth, we are computing the empirical Fisher.

1. In the training loop for task B, one simply uses:

```python
    loss = task2_loss + lambda * ewc_loss_task_A

```

## Applications and Use Cases

Elastic Weight Consolidation (EWC) has a wide range of applications across various domains, particularly in scenarios where neural networks need to learn and adapt to new tasks or environments without forgetting previously acquired knowledge.

1. Embodied Intelligence: In the field of Embodied Intelligence, such as Robotics, autonomous vehicles, and video game AI, EWC can be employed to make EI learn and adapt to new tasks in real-time.

1. Personalized recommendation systems: In the context of recommendation systems, EWC can help create models that continually learn and adapt to users’ preferences and behaviors over time.

1. Healthcare and medical diagnosis: EWC can be utilized in healthcare applications, such as medical image analysis or patient monitoring, where models need to continually adapt to new patient data without losing knowledge from previous cases.

1. Natural language processing: In natural language processing tasks, such as sentiment analysis or machine translation, EWC can be employed to develop models that continually learn and adapt to new domains or languages without forgetting the knowledge acquired from previous tasks.

These are just a few examples of the numerous applications and use cases where EWC can be beneficial. By incorporating EWC into your projects, you can create neural networks that effectively learn and adapt to new tasks or environments while retaining knowledge from previous experiences, ultimately leading to more versatile and robust AI systems.

## Suggested Materials

1. [A continual learning survey: Defying forgetting in classification tasks (Matthias Lange)](https://arxiv.org/pdf/1909.08383.pdf)

1. [Overcoming catastrophic forgetting in neural networks (James Kirkpatrick)](https://www.pnas.org/doi/10.1073/pnas.1611835114)

1. [Fisher Information Matrix (Yuan-Hong Liao)](https://andrewliao11.github.io/blog/fisher-info-matrix/)

1. [EWC PyTorch Implementation by moskomule](https://github.com/moskomule/ewc.pytorch)
