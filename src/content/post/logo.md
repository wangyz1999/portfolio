---
title: "How I designed my website logo using AI tools in less than 30 minutes"
publishDate: "29 Jun 2023"
description: "Featuring Midjourney 5.2 + Vectorize.ai"
tags: ["AI", "Web Design"]
---

![The logo of my website, the big Y is the first letter of my name.](https://cdn-images-1.medium.com/max/3200/1*ao-xtFvCon1aqzMj2-udJQ.png)*The logo of my website, the big Y is the first letter of my name.*

Recently, I was inspired to overhaul my entire portfolio website completely, sparked by a sudden surge of excitement. I dived into the latest development stacks, experimented with fresh layouts, and explored innovative designs. My quest led me to Astro because of its lightweight nature and ability to build faster, modern websites. Being an academic portfolio, the content primarily focuses on my research work.


With the tedious task of creating layouts and writing project descriptions behind me, I felt something was still missing — a logo.

For some time, I’ve been aware of Midjourney, the AI-based art creator that’s famously known for outperforming human artists in competitions. Its proficiency in designing logos is nothing short of remarkable. Therefore, I decided to try it out.

## Midjourney

The recently released Midjourney 5.2 boasts an array of new features and enhanced visuals. Its interface continues to operate via Discord. The typical workflow looks something like this:

1. You conceptualize a logo idea

1. You instruct the AI on the desired drawing by providing a prompt

1. You add keywords like ‘vectorized,’ ‘logo,’ ‘isolated image,’ ‘white background,’ etc., ensuring the generated image can be easily edited later, once you’re satisfied with the design

1. You experiment with various prompt wordings and parameters, gradually fine-tuning the logo design

For my portfolio, I wanted the logo to incorporate elements of my name, as well as symbols that represent me. However, fusing multiple elements into a single, harmonious logo is a challenging feat. I was keen to see if Midjourney could rise to this challenge.

To keep things simple initially, I asked the AI if it could merge the letters ‘W’ and ‘Y’. My exact instruction looked something like this:

    Minimal logo design featuring the letter Y and the letter W. svg, 
    vectorized image, isolated image, transparent background

The design looks sick, but somehow it didn’t get the task of combining letters, and somehow a middle ground between letter Y and W is a V:

![Midjourney’s logo design of letter Y and W combined](https://cdn-images-1.medium.com/max/4096/1*N5jlZVC3Qo-6AwWGK_7k_A.png)*Midjourney’s logo design of letter Y and W combined*

Next, I tried maybe combining letters with other elements, like a husky or a penguin as indicated by my profile pic. This time, I added keywords such as “monotone design” or “simple sticker”, since I need to create an svg for my logo and I don’t want the post processing be too complicated.

![Midjourney logo design of penguin and husky combined with letters Y and W](https://cdn-images-1.medium.com/max/4096/1*SKXJSXe_sGLNfNQ5mjAKcQ.png)*Midjourney logo design of penguin and husky combined with letters Y and W*

Despite my clear instructions, Midjourney had a bit of trouble combining the husky or penguin elements with the ‘Y’ or ‘W’. There were moments when I wished my name included a ‘V’, given how many cool designs were incorporated in this letter.

To simplify the design, I added the ‘monotone’ prompt, but this inadvertently stripped away some of the logo’s charm. Being a fan of cute animals, I decided to try something different — a cat.

This time around, I incorporated the special parameter “niji 5”, triggering Midjourney to employ its ‘niji’ model. This model, trained on a wealth of anime and hand-drawn images, might just give me the adorable outcome I’m hoping for.

![Midjourney logo design of cat and letter W and Y, using — niji 5](https://cdn-images-1.medium.com/max/4096/1*IJwdm9f-uhLv4sMyoS2_Aw.png)*Midjourney logo design of cat and letter W and Y, using — niji 5*

![Midjourney logo design of cat and letter W and Y, using — niji 5](https://cdn-images-1.medium.com/max/4096/1*6yYUbwB_Qdqa98QPdG0COA.png)*Midjourney logo design of cat and letter W and Y, using — niji 5*

or rabbits

![Midjourney logo design of rabbits and the letter Y, using — niji 5](https://cdn-images-1.medium.com/max/4096/1*9XwXzxGnoAOvCP_Onlcqtw.png)*Midjourney logo design of rabbits and the letter Y, using — niji 5*

Now I start to see the image style that I like. I have no background in art design, but this logo looks sick to me. However, on the task of combining cats with letters, it looks like Midjourney is simply overlaying the cat and the letter as separate objects rather than a design that combines these two.

Furthermore, maybe a rabbit or a cat is too cute for me. How about using the umbrella term “animal”? I also found this article that shows some cool tricks for prompting logo art.
[**20+ Stunning MidJourney Prompts for Logo Design**
*Design The Perfect Logo To Elevate the Brand*bootcamp.uxdesign.cc](https://bootcamp.uxdesign.cc/20-stunning-midjourney-logo-design-prompts-ef1eefc838bf)

One of the trick I learned is to add famous artist name into the prompt to let it have the artist style. I’m gonna go with Robb Janoff, the man who designed the Apple Logo.

![Midjourney logo design of an animal and the letter Y, using — niji 5](https://cdn-images-1.medium.com/max/4096/1*Y2fzSOihRqZtLYOesfBceA.png)*Midjourney logo design of an animal and the letter Y, using — niji 5*

I kind of like them all; it's hard for me to choose… But eventually, I decided to go with one in the lower left corner. Now it’s time to take some variations of it.

![Variations of an animal and the letter Y, created by Midjourney.](https://cdn-images-1.medium.com/max/4096/1*uFMJEoTnusB6rSjCtXwZzw.png)*Variations of an animal and the letter Y, created by Midjourney.*

I was particularly drawn to one design that combined an animal and the letter ‘Y’. The creative use of leaves, bushes, and vines created a harmonious blend of the letter and the endearing creature. However, I wanted to push the boundaries a bit further.

I aimed for a similar design pattern based on the same prompt but with a twist. I wanted the design variations to go a little while. One effective way to achieve this is by uploading the best-generated image and embedding the link to the uploaded image as part of the prompt so that Midjourney can remix it.

![Remix of the previous image](https://cdn-images-1.medium.com/max/4096/1*cF03i3drS72WOUyM1Yr8kg.png)*Remix of the previous image*

You can’t tell how much I love the last one. The letter is clean and separated from the drawing, yet the drawing of an animal and green vegetation is so harmonically intertwined with the letter Y. It just seemed too perfect for me.

![](https://cdn-images-1.medium.com/max/4096/1*tChK_TCWHDTdawowgEmShw.png)

I want them all… But have to pick one of them. The next step is to vectorize it since I want an SVG logo. Let’s also use AI for this.

## Vectorizer.ai
[**Trace Pixels To Vectors in Full Color**
*Trace pixels to vectors in full color using AI.*vectorizer.ai](https://vectorizer.ai/)

The tool vectorizer.ai is perfect for this. It converts JPEG and PNG bitmaps to SVG vectors quickly and easily using AI algorithms.

After some final tweaking using Photoshop to change the background color and some details. (I actually used Procreate on my iPad, but the process is similar), I have my final result:

![My final logo designed and created using Midjourney + vectorizer.ai + procreate](https://cdn-images-1.medium.com/max/3248/1*10RLv5zDCXSzz5VU8Xe57g.png)*My final logo designed and created using Midjourney + vectorizer.ai + procreate*

This is the final prompt I used:

    flat vector logo of a rabbit and letter Y, vectorized, isolated image, 
    white background, simple sticker, by Robb Janoff --niji 5

I’m pretty happy with the look. It’s nice and clean. What is more important is: this whole process took me less than 30 minutes, and most of my work is typing. I cannot imagine how else I can accomplish this without AI tools…
