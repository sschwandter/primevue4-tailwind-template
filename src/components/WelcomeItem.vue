<template>
  <div class="item mt-8 flex relative lg:mt-0 lg:py-1 lg:pb-4 lg:pl-[calc(theme(spacing.section)/2)]">
    <i class="flex items-center justify-center size-8 text-surface-900 dark:text-surface-0">
      <slot name="icon"></slot>
    </i>
    <div class="flex-1 ml-4">
      <h3 class="text-xl font-medium mb-1.5 text-surface-900 dark:text-surface-0">
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--p-content-border-color);
    background: var(--p-content-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--p-content-border-color);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--p-content-border-color);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
