const 정답 ='APPLE';

let attempts = 0;
let index = 0;
let timer = 0;



function appStart(){
    const displayGameover = () =>{
        const div = document.createElement("div");
        div.innerText = "게임이 종료 됐습니다.";
        div.style = "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:42vw; background-color:white; width:200px; height:100px; font-weight:bold; font-size:20px; border:3px solid black;";

        document.body.appendChild(div);
    };
    const nextLine = () =>{
        if(attempts === 6)return gameover();
        attempts += 1;
        index = 0;
    };
    const gameover = () =>{
        window.removeEventListener("keydown",handlekeydown);
       displayGameover();
       clearInterval(timer);
    };
    const handleEnterkey = () =>{
      let 맞은_갯수 =0;
      for(let i=0; i<5 ; i++){
        const block = document.querySelector(`.board-block[data-index='${attempts}${i}']`
        );
        const 입력한_글자 = block.innerText;
        const 정답_글자 = 정답[i];
        if(입력한_글자 === 정답_글자){ 
            맞은_갯수 += 1;
            block.style.background ="#538d4e";
        } else if(정답.includes(입력한_글자)) block.style.background="#b59f3a";
        else block.style.background= "#787C7E"
        block.style.color="white";
      }
      if(맞은_갯수 === 5) gameover(); 
       else nextLine();
    };
    const handleBackspace = () =>{
        if(index>0){
        const preBlock = document.querySelector(`.board-block[data-index='${attempts}${index -1}']`
        );
       preBlock.innerText ="";
    }
       if (index !== 0) index -= 1;
    };


    const handlekeydown = (event) => {
        const key =event.key.toUpperCase();
        const keyCode = event.keyCode;
       const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`
       );

      if (event.key === "Backspace") handleBackspace();
      else if (index=== 5) {
          if(event.key === "Enter")handleEnterkey();
          else return;
       } else if(65 <= keyCode && keyCode <= 90){
        thisBlock.innerText = key;
        // index += 1; index = index +1; index++; 세개다 같은 표현임
        index += 1;
       }
    };
    const startTimer = () =>{
       const start_time = new Date();
       function setTime(){
        const 현재_시간 = new Date();
        const 흐른_시간  = new Date(현재_시간 - start_time);
        const minute  = 흐른_시간.getMinutes().toString().padStart(2, "0");
        const seconds = 흐른_시간.getSeconds().toString().padStart(2, "0");
        const timeDiv = document.querySelector("#timer");
        timeDiv.innerText =`${minute}:${seconds}`; 
       } 
      timer =  setInterval(setTime,1000);
    };
    startTimer();
    window.addEventListener("keydown", handlekeydown);
}



appStart();
