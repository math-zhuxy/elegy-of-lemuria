export const BASIC_GAME_SETS= {
    "game_speed": 6,
};
export function DrawGameSpriteImage(
    img: HTMLImageElement,
    ctx: CanvasRenderingContext2D,
    cnt: number,
    num_sprite: number,
    pos: { x: number; y: number; },
){
    let spriteWidth = img.width / num_sprite;
    let spriteHeight = img.height;
    let spriteIndex = Math.floor(cnt) % num_sprite;
    ctx.drawImage(
        img,
        spriteIndex * spriteWidth,
        0,
        spriteWidth,
        spriteHeight,
        pos.x,
        pos.y,
        spriteWidth,
        spriteHeight
    );
}