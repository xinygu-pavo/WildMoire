<div align="center">

# Improving Complex Moiré Removal with Generative Supervision

---

**Xinyang Gu<sup>1</sup>, Zhilu Zhang<sup>1</sup>, Honglei Xu<sup>1</sup>, Yanting Mei<sup>1</sup>, Yukang Ding<sup>2</sup>, Wangmeng Zuo<sup>1</sup>**

<sup>1</sup> Harbin Institute of Technology, Harbin, China  
<sup>2</sup> Alibaba Group - Taobao & Tmall Group

<p>
  <a href="https://xinygu-pavo.github.io/WildMoire/">
    <img src="https://img.shields.io/badge/PROJECT%20PAGE-1f2d4d?style=for-the-badge" alt="Project Page">
  </a>
  <img src="https://img.shields.io/badge/PAPER%20(PDF)-4b4b4b?style=for-the-badge" alt="Paper PDF Coming Soon">
  <img src="https://img.shields.io/badge/ARXIV-COMING%20SOON-b31b1b?style=for-the-badge" alt="arXiv Coming Soon">
</p>

</div>

<p align="center">
  <img src="https://xinygu-pavo.github.io/WildMoire/static/images/complex_moire.jpg" width="900" alt="Complex moiré examples and restoration results">
</p>

Complex moiré patterns, characterized by large-scale chromatic bands and overlapping interference, remain challenging for existing demoiréing models. Models trained only on previous datasets often leave residual artifacts and suppress image details. We address this limitation with a **generative-supervision framework** that constructs reliable paired supervision from real moiré observations. Incorporating the resulting WildMoiré supervision substantially improves complex moiré removal while better preserving the original captured content.

## Abstract

The availability of high-quality paired data is essential for training learning-based image demoiréing models. However, it remains challenging for existing datasets to encompass the complex moiré patterns captured in uncontrolled real-world scenarios. Such degradations typically manifest as large-scale, multicolored moiré patterns. Moreover, these patterns frequently occur in images for which clean counterparts are difficult to obtain, such as photographs acquired from public displays or existing online resources.

We propose a data engine designed to improve the removal of complex moiré patterns by generating training supervision. We first collect real-world images containing complex moiré patterns and localize the corresponding screen regions. Multiple image-conditioned generative foundation models then produce candidate references, which are subjected to patch-level quality control to filter and select reliable supervision. Based on this paradigm, we construct **WildMoiré** with 6.8K moiré–GT training pairs and an independent captured test set of approximately 250 pairs. Extensive experiments on ESDNet, SDXL, and Qwen-Image-Edit show consistent improvements in complex moiré removal.

## Method Overview

<p align="center">
  <img src="https://xinygu-pavo.github.io/WildMoire/static/images/pipeline.jpg" width="900" alt="WildMoiré data construction pipeline">
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

### Challenging Cases from UHDM and DCID

The best result within each comparison block is highlighted in **bold**.

| Model | Training | PSNR ↑ | SSIM ↑ | LPIPS ↓ | MUSIQ ↑ | TOPIQ ↑ | Q-Align ↑ |
|---|---|---:|---:|---:|---:|---:|---:|
| GPT-Image-2 | — | 16.4847 | 0.6288 | 0.3597 | **47.6108** | **0.4396** | **4.4022** |
| Nano-Banana-2 | — | **19.5363** | **0.7320** | **0.2859** | 45.6903 | 0.4112 | 4.2289 |
| ESDNet | UHDM + DCID | 26.5372 | 0.8722 | 0.2483 | 34.1202 | 0.3006 | 3.9790 |
| ESDNet | + WildMoiré | **26.9181** | **0.8784** | **0.2441** | **34.9631** | **0.3109** | **4.0698** |
| SDXL | UHDM + DCID | 26.5779 | 0.8706 | 0.2467 | 36.5014 | 0.3082 | 4.0967 |
| SDXL | + WildMoiré | **26.8603** | **0.8746** | **0.2458** | **37.1075** | **0.3187** | **4.1343** |
| Qwen-Image-Edit | UHDM + DCID | 26.9703 | 0.8801 | **0.2360** | 44.7053 | 0.4118 | 4.2721 |
| Qwen-Image-Edit | + WildMoiré | **27.3071** | **0.8870** | 0.2367 | **46.8816** | **0.4174** | **4.3152** |

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
