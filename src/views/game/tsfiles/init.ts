import { ENEMY_SPRITE } from "./battle_enemy";
import { KNIGHT_SPRITE } from "./battle_knight";
export function GameBattleInit() {
    KNIGHT_SPRITE.MaxHP = 120;
    KNIGHT_SPRITE.InitialAttack = 10;

    KNIGHT_SPRITE.IdleImage = new Image();
    KNIGHT_SPRITE.IdleImage.src = "/img/knight/Idle.png";
    KNIGHT_SPRITE.RunImage = new Image();
    KNIGHT_SPRITE.RunImage.src = "/img/knight/Run.png";
    KNIGHT_SPRITE.AttackImage = new Image();
    KNIGHT_SPRITE.AttackImage.src = "/img/knight/Attack.png";
    KNIGHT_SPRITE.DeadImage = new Image();
    KNIGHT_SPRITE.DeadImage.src = "/img/knight/Dead.png";

    ENEMY_SPRITE.MaxHP = 80;
    ENEMY_SPRITE.InitialAttack = 10;

    ENEMY_SPRITE.IdleImage = new Image();
    ENEMY_SPRITE.IdleImage.src = "/img/skeleton/Idle.png";
    ENEMY_SPRITE.RunImage = new Image();
    ENEMY_SPRITE.RunImage.src = "/img/skeleton/Run.png";
    ENEMY_SPRITE.AttackImage = new Image();
    ENEMY_SPRITE.AttackImage.src = "/img/skeleton/Attack.png";
    ENEMY_SPRITE.DeadImage = new Image();
    ENEMY_SPRITE.DeadImage.src = "/img/skeleton/Dead.png";

}