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
  <a href="https://xinygu-pavo.github.io/WildMoire/static/paper/WildMoire.pdf">
    <img src="https://img.shields.io/badge/PAPER%20(PDF)-4b4b4b?style=for-the-badge" alt="Paper PDF">
  </a>
  <a href="https://arxiv.org/abs/2608.17883">
    <img src="https://xinygu-pavo.github.io/WildMoire/static/images/arxiv-badge.svg" alt="arXiv 2608.17883">
  </a>
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

The better result within each comparison block is highlighted in **bold**.

### Our Captured Test Set

<p align="center">
  <img src="https://xinygu-pavo.github.io/WildMoire/static/images/table3_main.png" width="900" alt="Quantitative results on our captured test set">
</p>

### Challenging Cases from UHDM and DCID

<p align="center">
  <img src="https://xinygu-pavo.github.io/WildMoire/static/images/tableD_udhm_dcid.png" width="900" alt="Quantitative results on challenging cases from UHDM and DCID">
</p>

## Qualitative Results

Our project page provides interactive comparisons on both **our captured test set** and **challenging cases from UHDM and DCID**. For the trainable models, the sliders directly compare the baseline results with the corresponding models trained using WildMoiré.

👉 **[View interactive qualitative comparisons on the project page](https://xinygu-pavo.github.io/WildMoire/#qualitative)**

## Open-Source Release

The dataset and source code will be publicly released. Please watch this repository for updates.

## Links

- [Project Page](https://xinygu-pavo.github.io/WildMoire/)
- [Paper (PDF)](https://xinygu-pavo.github.io/WildMoire/static/paper/WildMoire.pdf)
- [arXiv](https://arxiv.org/abs/2608.17883)

## Citation

If you find this work useful, please consider citing:

```bibtex
@article{gu2026improving,
  title   = {Improving Complex Moiré Removal with Generative Supervision},
  author  = {Xinyang Gu and Zhilu Zhang and Honglei Xu and Yanting Mei and Yukang Ding and Wangmeng Zuo},
  journal = {arXiv preprint arXiv:2608.17883},
  year    = {2026}
}
```
