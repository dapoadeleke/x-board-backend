interface CardResource {
    id: number;
    boardId: number;
    index: number;
    startX: number;
    startY: number;
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
    votes: number;
    locked: boolean;
    textColor: CardTextColor;
}

interface CardTextColor {
    background: string;
    foreground: string;
}
