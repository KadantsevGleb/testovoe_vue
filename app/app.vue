<template>
  <div class="root">
    <NuxtPage />
  </div>
</template>

<style>
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('@/assets/fonts/RobotoRegular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('@/assets/fonts/RobotoMedium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('@/assets/fonts/RobotoSemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('@/assets/fonts/RobotoBold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('@/assets/fonts/RobotoExtraBold.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }
  html {
    font-size: 16px;
    line-height: 1.625;
  }
  body {
    font-family: 'Roboto', sans-serif;
    background: #000;
    min-height: calc(100vh - 20px);
    background-image: url('assets/img/bg.jpg');
    background-repeat: no-repeat;
    /*background-size: contain;*/
    background-position: calc(100% + 400px) calc(100% + 400px);
  }
</style>
