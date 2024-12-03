export default {
    data() {
        return {
            board: Array(15).fill().map(() => Array(15).fill("")),
            currentPlayer: "O",
            gameEnded: false,
            winningLine: [],
            moveHistory: [],
        };
    },
    methods: {
        handleClick(row, col) {
            if (this.gameEnded || this.board[row][col]) {
                return;
            }
            this.board[row][col] = this.currentPlayer;
            this.moveHistory.push({ row, col, player: this.currentPlayer });
            if (this.checkWin(row, col)) {
                this.gameEnded = true;
                setTimeout(() => {
                    alert(`${this.currentPlayer} 赢了！`);
                }, 50);
                return;
            }
            this.currentPlayer = this.currentPlayer === "O" ? "X" : "O";
        },
        checkWin(row, col) {
            const directions = [
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 1 },
                { x: 1, y: -1 },
            ];
            for (const direction of directions) {
                let count = 1;
                let line = [{ row, col }];
                count += this.countInDirection(row, col, direction.x, direction.y, line);
                count += this.countInDirection(row, col, -direction.x, -direction.y, line);
                if (count >= 5) {
                    this.winningLine = line.slice(0, 5);
                    return true;
                }
            }
            return false;
        },
        countInDirection(row, col, dx, dy, line) {
            let count = 0;
            let x = row + dx;
            let y = col + dy;
            while (x >= 0 && x < 15 && y >= 0 && y < 15 && this.board[x][y] === this.currentPlayer) {
                count++;
                line.push({ row: x, col: y });
                x += dx;
                y += dy;
            }
            return count;
        },
        getLineStyle() {
            if (this.winningLine.length === 0) return {};
            const start = this.winningLine[0];
            const end = this.winningLine[4];
            const startX = start.col * 30 + 15;
            const startY = start.row * 30 + 15;
            const endX = end.col * 30 + 15;
            const endY = end.row * 30 + 15;
            const angle = (Math.atan2(endY - startY, endX - startX) * 180) / Math.PI;
            const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
            return {
                left: `${startX}px`,
                top: `${startY}px`,
                width: `${length}px`,
                transform: `rotate(${angle}deg)`,
                transformOrigin: "0 0",
            };
        },
        resetGame() {
            this.board = Array(15).fill().map(() => Array(15).fill(""));
            this.currentPlayer = "O";
            this.gameEnded = false;
            this.winningLine = [];
            this.moveHistory = [];
        },
        undoMove() {
            if (this.moveHistory.length === 0 || this.gameEnded) return;
            const lastMove = this.moveHistory.pop();
            this.board[lastMove.row][lastMove.col] = "";
            this.currentPlayer = lastMove.player;
            this.winningLine = [];
        },
    },
};
