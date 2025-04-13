import { GameBattleInit} from "./init";
import { KEYBOARD, CAMERA } from "./utils";
import { GameSpriteManagement } from "./list";
export function StartGame(){
    GameBattleInit();
    let Test_Using_Knight = true;
    const GameManage = new GameSpriteManagement();
    const canvas = document.getElementById('game') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    function HandleKeydown(event: KeyboardEvent) {
        KEYBOARD.KeyDown(event.key);
        if (event.key === 'q') {
            Test_Using_Knight = true;
        }
        else if (event.key === 'e') {
            Test_Using_Knight = false;
        }
        else if (event.key === 'Escape') {
            QuitGame();
        }
    }
    function HandleKeyUp(event: KeyboardEvent) {
        KEYBOARD.KeyUp(event.key);
    }
    function HandleMouseClick(event: MouseEvent) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left + CAMERA.GetPos().x;
        const y = event.clientY - rect.top + CAMERA.GetPos().y;
        if(Test_Using_Knight) GameManage.AddKnight(x, y);
        else GameManage.AddEnemy(x, y);
    }
    
    window.addEventListener('keydown', HandleKeydown);
    window.addEventListener('keyup', HandleKeyUp);
    window.addEventListener('click', HandleMouseClick);
    const GameLoop = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        KEYBOARD.MoveCamera();
        GameManage.DoAction(ctx);
    }, 30);
    function QuitGame() {
        clearInterval(GameLoop);
        window.removeEventListener('keydown', HandleKeydown);
        window.removeEventListener('keyup', HandleKeyUp);
        window.removeEventListener('click', HandleMouseClick);
    }
}