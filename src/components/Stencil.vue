<script>
import {
  DraggableElement,
  DraggableArea,
  StencilPreview,
  ResizeEvent,
} from "vue-advanced-cropper";

export default {
  components: {
    StencilPreview,
    DraggableArea,
    DraggableElement,
  },
  props: {
    image: {
      type: Object,
    },
    coordinates: {
      type: Object,
    },
    transitions: {
      type: Object,
    },
    stencilCoordinates: {
      type: Object,
    },
  },
  computed: {
    style() {
      const { height, width, left, top } = this.stencilCoordinates;
      const style = {
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${left}px, ${top}px)`,
      };
      if (this.transitions && this.transitions.enabled) {
        style.transition = `${this.transitions.time}ms ${this.transitions.timingFunction}`;
      }
      return style;
    },
  },
  methods: {
    onMove(moveEvent) {
      this.$emit("move", moveEvent);
    },
    onMoveEnd() {
      this.$emit("move-end");
    },
    onResize(dragEvent) {
      const shift = dragEvent.shift();

      const widthResize = shift.left;
      const heightResize = -shift.top;

      this.$emit(
        "resize",
        new ResizeEvent(
          {
            left: widthResize,
            right: widthResize,
            top: heightResize,
            bottom: heightResize,
          },
          {
            compensate: true,
          }
        )
      );
    },
    onResizeEnd() {
      this.$emit("resize-end");
    },
    aspectRatios() {
      return {
        minimum: 1,
        maximum: 1,
      };
    },
  },
};
</script>

<template>
  <div class="circle-stencil" :style="style">
        <draggable-element
            class="circle-stencil__handler top-left corner"
            @drag="onResize"
            @drag-end="onResizeEnd"
        >
        </draggable-element>
        <draggable-element
            class="circle-stencil__handler top-right corner"
            @drag="onResize"
            @drag-end="onResizeEnd"
        >
        </draggable-element>

        <draggable-area @move="onMove" @move-end="onMoveEnd">
            <stencil-preview
                class="circle-stencil__preview"
                :image="image"
                :coordinates="coordinates"
                :width="stencilCoordinates.width"
                :height="stencilCoordinates.height"
                :transitions="transitions"
            />
        </draggable-area>

        <draggable-element
            class="circle-stencil__handler bottom-left corner"
            @drag="onResize"
            @drag-end="onResizeEnd"
        >
        </draggable-element>
        <draggable-element
            class="circle-stencil__handler bottom-right corner"
            @drag="onResize"
            @drag-end="onResizeEnd"
        >
        </draggable-element>
  </div>
</template>

<style lang="less">
    .circle-stencil {
        border-radius: 50%;
        cursor: move;
        position: absolute;
        border: 0;
        box-sizing: border-box;
        .corner {
            display: block;
            height: 30px;
            width: 30px;
            position: absolute;
            &.top-left {
                left: -5px;
                top: -5px;
                border-top: 2px solid #313638;
                border-left: 2px solid #313638;
                cursor: nw-resize;
            }
            &.top-right {
                right: -5px;
                top: -5px;
                border-top: 2px solid #313638;
                border-right: 2px solid #313638;
                cursor: ne-resize;
            }
            &.bottom-left {
                left: -5px;
                bottom: -5px;
                border-bottom: 2px solid #313638;
                border-left: 2px solid #313638;
                cursor: sw-resize;
            }
            &.bottom-right {
                right: -5px;
                bottom: -5px;
                border-bottom: 2px solid #313638;
                border-right: 2px solid #313638;
                cursor: se-resize;
            }
        }
        &__preview {
            border-radius: 50%;
            overflow: hidden;
        }
    }
</style>
