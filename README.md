# Improving Complex Moiré Removal with Generative Supervision

**Xinyang Gu<sup>1</sup>, Zhilu Zhang<sup>1</sup>, Honglei Xu<sup>1</sup>, Yanting Mei<sup>1</sup>, Yukang Ding<sup>2</sup>, Wangmeng Zuo<sup>1</sup>**

<sup>1</sup> Harbin Institute of Technology, Harbin, China  
<sup>2</sup> Alibaba Group - Taobao & Tmall Group

<p align="center">
  <a href="https://xinygu-pavo.github.io/WildMoire/"><b>Project Page</b></a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <b>arXiv: Coming Soon</b>
</p>

<p align="center">
  <img src="https://xinygu-pavo.github.io/WildMoire/static/images/complex_moire.jpg" width="900">
</p>

Complex moiré patterns, characterized by large-scale chromatic bands and overlapping interference, remain challenging for existing demoiréing models. Models trained only on previous datasets often leave residual artifacts and suppress image details. We address this limitation with a **generative-supervision framework** that constructs reliable paired supervision from real moiré observations. Incorporating the resulting WildMoiré supervision substantially improves complex moiré removal while better preserving the original captured content.

## Abstract

The availability of high-quality paired data is essential for training learning-based image demoiréing models. However, it remains challenging for existing datasets to encompass the complex moiré patterns captured in uncontrolled real-world scenarios. Such degradations typically manifest as large-scale, multicolored moiré patterns. Moreover, these patterns frequently occur in images for which clean counterparts are difficult to obtain, such as photographs acquired from public displays or existing online resources.

We propose a data engine designed to improve the removal of complex moiré patterns by generating training supervision. We first collect real-world images containing complex moiré patterns and localize the corresponding screen regions. Multiple image-conditioned generative foundation models then produce candidate references, which are subjected to patch-level quality control to filter and select reliable supervision. Based on this paradigm, we construct **WildMoiré** with 6.8K moiré–GT training pairs and an independent captured test set of approximately 250 pairs. Extensive experiments on ESDNet, SDXL, and Qwen-Image-Edit show consistent improvements in complex moiré removal.

## What Makes Our Approach Different?

Existing paired demoiréing datasets provide reliable supervision, but collecting clean counterparts for complex real-world screen captures is difficult to scale. Our framework instead turns the complementary visual priors of multiple image-conditioned generative models into quality-controlled training supervision.

Rather than relying on a single generator, we generate multiple candidate references and process them through spatial and color alignment, synchronized patch extraction, pre-filtering, and optimal GT selection. This allows locally suitable supervision to be selected while reducing residual moiré, content hallucination, and color inconsistency.

## Method Overview

<p align="center">
  <img src="https://xinygu-pavo.github.io/WildMoire/static/images/pipeline.jpg" width="900">
</p>

We first collect real screen-captured images containing complex moiré patterns and localize the corresponding display regions. Five image-conditioned generative models are then used to produce candidate GT images. To establish reliable supervision, these candidates are aligned with the input in spatial position and color, cropped into synchronized patches, and processed by pre-filtering and optimal GT selection.

This offline construction pipeline yields **6,832 moiré–GT pairs at 1024×1024 resolution**. During training, scale transformation augmentation further changes the scale of moiré patterns to improve generalization across ESDNet, SDXL, and Qwen-Image-Edit.

## Quantitative Results

### Our Captured Test Set

The best result within each comparison block is highlighted in **bold**.

| Model | Training | PSNR ↑ | SSIM ↑ | LPIPS ↓ | MUSIQ ↑ | TOPIQ ↑ | Q-Align ↑ |
|---|---|---:|---:|---:|---:|---:|---:|
| GPT-Image-2 | — | 15.1965 | 0.5265 | **0.4636** | **65.4375** | **0.5831** | 4.3665 |
| Nano-Banana-2 | — | **16.8793** | **0.5679** | 0.4696 | 60.9621 | 0.5002 | **4.4743** |
| ESDNet | UHDM + DCID | 21.5002 | 0.7341 | 0.3471 | 38.1971 | 0.2770 | 3.6343 |
| ESDNet | + WildMoiré | **23.3714** | **0.7821** | **0.2614** | **44.2109** | **0.3413** | **3.9607** |
| SDXL | UHDM + DCID | 21.9034 | 0.7522 | 0.2951 | 41.4789 | 0.3203 | 3.8128 |
| SDXL | + WildMoiré | **23.5644** | **0.7887** | **0.2621** | **45.0712** | **0.3583** | **4.0811** |
| Qwen-Image-Edit | UHDM + DCID | 22.2314 | 0.7578 | 0.3101 | 55.3314 | 0.4276 | 4.1005 |
| Qwen-Image-Edit | + WildMoiré | **23.9313** | **0.7851** | **0.2528** | **58.9680** | **0.4624** | **4.2982** |

Adding WildMoiré consistently improves all three trainable architectures on our captured test set, demonstrating the effectiveness of the proposed generative supervision for challenging complex moiré removal.

## Qualitative Results

Our project page provides interactive comparisons on both **our captured test set** and **challenging cases from UHDM and DCID**. For the trainable models, the sliders directly compare the baseline results with the corresponding models trained using WildMoiré.

👉 **[View interactive qualitative comparisons on the project page](https://xinygu-pavo.github.io/WildMoire/#qualitative)**

## Open-Source Release

The dataset and source code will be publicly released. Please watch this repository for updates.

## Links

- **Project Page:** https://xinygu-pavo.github.io/WildMoire/
- **arXiv:** Coming soon

## Citation

If you find this work useful, please consider citing:

```bibtex
@misc{gu2026improving,
  title  = {Improving Complex Moiré Removal with Generative Supervision},
  author = {Xinyang Gu and Zhilu Zhang and Honglei Xu and Yanting Mei and Yukang Ding and Wangmeng Zuo},
  year   = {2026}
}
```
