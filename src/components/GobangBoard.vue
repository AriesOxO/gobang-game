<template>
  <div class="gobang-container">
    <div class="controls">
      <button class="button" @click="resetGame">重置棋盘</button>
      <button class="button" @click="undoMove">悔棋</button>
    </div>
    <div class="gobang-board">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
        <div
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          class="cell"
          @click="handleClick(rowIndex, cellIndex)"
        >
          <transition name="fade">
            <span v-if="cell" :class="cell === 'O' ? 'piece-o' : 'piece-x'">{{
              cell
            }}</span>
          </transition>
        </div>
      </div>
      <div
        v-if="winningLine.length"
        class="winning-line"
        :style="getLineStyle()"
      ></div>
    </div>
  </div>
</template>

<script src="./js/GobangBoard.js"></script>
<style src="./css/GobangBoard.css" scoped></style>